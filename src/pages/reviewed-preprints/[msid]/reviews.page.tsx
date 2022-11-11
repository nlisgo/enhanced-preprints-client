import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { config } from '../../../config';
import { manuscripts } from '../../../manuscripts';
import { jsonFetch } from '../../../utils/json-fetch';
import { MetaData, PeerReview } from '../../../types';
import { ArticlePage, ArticleStatusProps } from '../../../components/pages/article/article-page';
import { ArticleReviewsTab } from '../../../components/pages/article/tabs/reviews-tab';

type PageProps = {
  metaData: MetaData,
  status: ArticleStatusProps,
  peerReview: PeerReview
};
export const Page = (props: PageProps): JSX.Element => (
  <ArticlePage metaData={props.metaData} status={props.status} activeTab="reviews">
    <ArticleReviewsTab peerReview={props.peerReview}></ArticleReviewsTab>
  </ArticlePage>
);

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
  const msid = context.params?.msid;
  if (msid === undefined) {
    console.log('no msid in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  if (Array.isArray(msid)) {
    console.log('multiple ids in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  if (!manuscripts[msid]) {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const manuscriptConfig = manuscripts[msid];

  // map msid to preprint doi
  const { preprintDoi } = manuscriptConfig;
  const [metaData, peerReview, status] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${preprintDoi}/metadata`),
    jsonFetch<PeerReview>(`${config.apiServer}/api/reviewed-preprints/${preprintDoi}/reviews`),
    // replace with call for data
    manuscripts[msid].status,
  ]);

  context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

  return {
    props: {
      metaData: {
        ...metaData,
        msid: manuscriptConfig.msid,
        version: manuscriptConfig.version,
        pdfUrl: manuscriptConfig.pdfUrl,
        msas: manuscriptConfig.msas,
      },
      status,
      peerReview,
    },
  };
};

export default Page;