import { ArticleContent } from '../../atoms/article-content/article-content';
import { Heading } from '../../atoms/heading/heading';
import { Heading as JumpMenuHeading, JumpToMenu } from '../../atoms/jump-to-menu/jump-to-menu';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader, ContentHeaderProps } from '../../molecules/content-header/content-header';
import { SiteHeader } from '../../molecules/site-header/site-header';
import { Tab, TabbedNavigation } from '../../molecules/tabbed-navigation';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import { Content } from '../../../types/content';
import styles from './article-page.module.scss';
import { EditorsAndReviewers } from '../../atoms/editors-and-reviewers/editors-and-reviewers';
import { ReviewContent } from '../../atoms/review-content/review-content';
import { Abstract } from '../../atoms/abstract/abstract';
import { Reference, ReferenceList } from '../../atoms/reference-list/reference-list';

export type ArticlePageProps = ContentHeaderProps & {
  msid: string,
  version: string,
  references: Reference[],
  headings: JumpMenuHeading[],
};

export type ArticleStatusProps = {
  timeline: TimelineEvent[],
  articleType: string,
  status: string,
};

export enum ReviewType {
  EvaluationSummary = 'evaluation-summary',
  Review = 'review-article',
  AuthorResponse = 'reply',
}

type Participant = {
  name: string,
  role: string,
  institution: string,
};

type Evaluation = {
  date: Date,
  reviewType: ReviewType,
  text: string,
  participants: Participant[],
};

export type PeerReviewProps = {
  evaluationSummary: Evaluation,
  reviews: Evaluation[],
  authorResponse?: Evaluation,
};

const getFigures = (content: Content): Content => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part) => getFigures(part));
  }
  switch (content.type) {
    case 'Figure':
      return content;
    default:
      return '';
  }
};

export const ArticlePage = (props: { metaData: ArticlePageProps, abstract: Content, content: Content, status: ArticleStatusProps, peerReview: PeerReviewProps }): JSX.Element => (
  <div className={`${styles['grid-container']} ${styles['article-page']}`}>
    <div className={styles['grid-header']}>
      <SiteHeader />
    </div>
    <div className={styles['primary-section-header']}>
      <ContentHeader
        doi={`10.7554/eLife.${props.metaData.msid}.${props.metaData.version}`}
        msas={props.metaData.msas}
        authors={props.metaData.authors}
        institutions={props.metaData.institutions}
        title={props.metaData.title}
      />
    </div>
    <main className={styles['primary-section']}>
      <TabbedNavigation>
        <Tab label="Full text">
          <JumpToMenu active={0} headings={[{ id: 'abstract', text: 'Abstract' }, { id: 'assessment', text: 'eLife assessment' }, ...props.metaData.headings, { id: 'references', text: 'References' }]} />
          <div className={styles['article-body-container']}>
            <Abstract content={props.abstract} />
            <ReviewContent content={props.peerReview.evaluationSummary.text} isAssessment={true} />
            <ArticleContent content={props.content} />
            <ReferenceList references={props.metaData.references} />
          </div>
        </Tab>
        <Tab label="Figures and data">
          <Heading id="figures" headingLevel={2} content="Figures and data" />
          <ArticleContent content={getFigures(props.content)} />
        </Tab>
        <Tab label="Peer review">
          <EditorsAndReviewers participants={props.peerReview.evaluationSummary.participants} />
          {props.peerReview.reviews.map((review, index) => (
            <ReviewContent key={index} content={review.text} />
          ))}
        </Tab>
      </TabbedNavigation>
    </main>
    <aside className={styles['side-section']}>
      <ArticleStatus articleStatus={props.status.status} articleType={props.status.articleType}/>
      <Timeline events={props.status.timeline}/>
    </aside>
  </div>
);