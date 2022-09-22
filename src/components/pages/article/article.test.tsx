import fetchMock from 'fetch-mock';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ArticlePage } from './article';
import { mockContent } from '../../atoms/article-content/mock-content';

describe('SiteHeader', () => {
  it('renders the article page', async () => {
    fetchMock.restore().mock('/api/article/10.1101/2022.04.13.488149/metadata', {
      msas: ['Mad Science', 'Alchemy'],
      importance: 'Landmark',
      strengthOfEvidence: 'Tour-de-force',
      title: 'This is a title',
      authors: [
        { givenNames: ['Steve'], familyNames: ['Rogers'] },
        { givenNames: ['Antony'], familyNames: ['Stark'] },
        { givenNames: ['Natasha'], familyNames: ['Romanov'] },
        { givenNames: ['Bruce'], familyNames: ['Banner'] },
        { givenNames: ['Wanda'], familyNames: ['Maximof'] },
        { givenNames: ['Bucky'], familyNames: ['Barnes'] },
        { givenNames: ['Barry'], familyNames: ['Allen'] },
        { givenNames: ['Jesse'], familyNames: ['Quick'] },
        { givenNames: ['Kara'], familyNames: ['Zor-el'] },
        { givenNames: ['Arthur'], familyNames: ['Curry'] },
        { givenNames: ['Kal'], familyNames: ['El'] },
        { givenNames: ['Oliver'], familyNames: ['Queen'] },
      ],
      headings: [{ id: 's1', text: 'Introduction' }],
    })
      .mock('/api/article/10.1101/2022.04.13.488149/content', mockContent);
    render(<ArticlePage
      doi={'10.1101/2022.04.13.488149'}
    />);
    await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

    expect(screen.getByAltText('eLife logo', { exact: false }).parentElement?.parentElement?.parentElement?.classList).toContain('article-page');
  });
});