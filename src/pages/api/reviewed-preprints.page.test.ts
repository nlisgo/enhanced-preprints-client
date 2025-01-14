import { reviewedPreprintSnippet } from './reviewed-preprints.page';
import { Author } from '../../types/author';

describe('reviewedPreprintSnippet', () => {
  it('prepares a reviewed preprint snippet with manuscript and metadata', () => {
    const result = reviewedPreprintSnippet({
      msid: 'msid1',
      version: '1',
      preprintDoi: 'preprintprovider/preprint1',
      status: {
        articleType: 'Reviewed Preprint',
        status: 'This Reviewed Preprint was published after peer review and assessment by eLife.',
        timeline: [
          { name: 'Reviewed Preprint posted', date: '2022-10-20' },
          { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.preprintprovider.org/content/preprint1', text: 'Go to preprintprovider' } },
          { name: 'Sent for peer review', date: '2022-06-24' },
        ],
      },
      pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
      msas: [
        'Cell Biology',
        'Physics of Living Systems',
      ],
      publishedYear: 2022,
    }, {
      abstract: 'content',
      authors: [
        {
          givenNames: [
            'First',
            'Middle',
          ],
          familyNames: [
            'Last',
            'Author 1',
          ],
        },
        {
          givenNames: [
            'First',
            'Middle',
          ],
          familyNames: [
            'Last',
            'Author 2',
          ],
        },
        {
          givenNames: [
            'First',
            'Middle',
          ],
          familyNames: [
            'Last',
            'Author 3',
          ],
        },
        {
          givenNames: [
            'First',
            'Middle',
          ],
          familyNames: [
            'Last',
            'Author 4',
          ],
        },
      ],
      doi: 'preprintprovider/preprint1',
      headings: [],
      msas: [],
      msid: 'msid1',
      pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
      references: [],
      title: 'title',
      version: 'version',
      publishedYear: 2023,
    });

    expect(result).toStrictEqual({
      id: 'msid1',
      doi: 'preprintprovider/preprint1',
      pdf: 'https://www.preprintprovider.org/content/preprint1.pdf',
      status: 'reviewed',
      authorLine: 'First Middle Last Author 1, First Middle Last Author 2 ... First Middle Last Author 4',
      title: 'title',
      published: '2022-10-20T03:00:00Z',
      reviewedDate: '2022-10-20T03:00:00Z',
      versionDate: '2022-10-20T03:00:00Z',
      statusDate: '2022-10-20T03:00:00Z',
      stage: 'published',
      subjects: [
        {
          id: 'cell-biology',
          name: 'Cell Biology',
        },
        {
          id: 'physics-living-systems',
          name: 'Physics of Living Systems',
        },
      ],
    });
  });

  it('prepares a reviewed preprint snippet with manuscript only', () => {
    const result = reviewedPreprintSnippet({
      msid: 'msid1',
      version: '1',
      preprintDoi: 'preprintprovider/preprint1',
      status: {
        articleType: 'Reviewed Preprint',
        status: 'This Reviewed Preprint was published after peer review and assessment by eLife.',
        timeline: [
          { name: 'Reviewed Preprint posted', date: '2022-10-20' },
          { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.preprintprovider.org/content/preprint1', text: 'Go to preprintprovider' } },
          { name: 'Sent for peer review', date: '2022-06-24' },
        ],
      },
      pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
      msas: [
        'Cell Biology',
        'Physics of Living Systems',
      ],
      publishedYear: 2023,
    });

    expect(result).toStrictEqual({
      id: 'msid1',
      doi: 'preprintprovider/preprint1',
      pdf: 'https://www.preprintprovider.org/content/preprint1.pdf',
      status: 'reviewed',
      authorLine: undefined,
      title: undefined,
      published: '2022-10-20T03:00:00Z',
      reviewedDate: '2022-10-20T03:00:00Z',
      versionDate: '2022-10-20T03:00:00Z',
      statusDate: '2022-10-20T03:00:00Z',
      stage: 'published',
      subjects: [
        {
          id: 'cell-biology',
          name: 'Cell Biology',
        },
        {
          id: 'physics-living-systems',
          name: 'Physics of Living Systems',
        },
      ],
    });
  });

  it.each([
    [
      [],
      undefined,
    ],
    [
      [
        {
          givenNames: [
            'Fir',
            'st',
          ],
          familyNames: [
            'Author',
          ],
        },
      ],
      'Fir st Author',
    ],
    [
      [
        {
          givenNames: [
            'Fir',
            'st',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Second',
          ],
          familyNames: [
            'Auth',
            'or',
          ],
        },
      ],
      'Fir st Author, Second Auth or',
    ],
    [
      [
        {
          givenNames: [
            'First',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Second',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Third',
          ],
          familyNames: [
            'Author',
          ],
        },
      ],
      'First Author, Second Author, Third Author',
    ],
    [
      [
        {
          givenNames: [
            'First',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Second',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Third',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Fourth',
          ],
          familyNames: [
            'Author',
          ],
        },
      ],
      'First Author, Second Author ... Fourth Author',
    ],
    [
      [
        {
          givenNames: [
            'First',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Second',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Third',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Fourth',
          ],
          familyNames: [
            'Author',
          ],
        },
        {
          givenNames: [
            'Fifth',
          ],
          familyNames: [
            'Author',
          ],
        },
      ],
      'First Author, Second Author ... Fifth Author',
    ],
  ])('prepares authorLine (%#)', (authors: Author[], expected: string | undefined) => {
    const result = reviewedPreprintSnippet({
      msid: 'msid1',
      version: '1',
      preprintDoi: 'preprintprovider/preprint1',
      status: {
        articleType: 'Reviewed Preprint',
        status: 'This Reviewed Preprint was published after peer review and assessment by eLife.',
        timeline: [
          { name: 'Reviewed Preprint posted', date: '2022-10-20' },
          { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.preprintprovider.org/content/preprint1', text: 'Go to preprintprovider' } },
          { name: 'Sent for peer review', date: '2022-06-24' },
        ],
      },
      pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
      msas: [],
      publishedYear: 2022,
    }, {
      abstract: 'content',
      authors,
      doi: 'preprintprovider/preprint1',
      headings: [],
      msas: [],
      msid: 'msid1',
      pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
      references: [],
      title: 'title',
      version: 'version',
      publishedYear: 2022,
    });

    expect(result.authorLine).toStrictEqual(expected);
  });
});
