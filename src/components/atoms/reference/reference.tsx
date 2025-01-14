import { Author, Reference as ReferenceData } from '../../../types';
import './reference.scss';

const formatName = (author: Author) => `${author.familyNames?.join(' ')} ${author.givenNames?.join(' ')}`;

export const ReferenceBody = ({ reference, isReferenceList = false }: { reference: ReferenceData, isReferenceList: boolean }): JSX.Element => {
  const referenceJournal = reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const referenceVolume = reference.isPartOf?.isPartOf?.volumeNumber ?? reference.isPartOf?.volumeNumber;
  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');

  return (
    <>
      { (isReferenceList && reference.meta?.label) && <span className="reference__label">{reference.meta.label}</span>}
      <ol className="reference__authors_list">
        {reference.authors.map((author, index) => (
          <li key={index} className="reference__author">
            {formatName(author)}
          </li>
        ))}
      </ol>

      <span className="reference__authors_list_suffix">{new Date(reference.datePublished).getFullYear()}</span>
      <span className="reference__title">{reference.title}</span>
      <span className="reference__origin">
        {referenceJournal ? <i>{referenceJournal} </i> : ''}
        {referenceVolume ? <b>{referenceVolume}:</b> : ''}
        {reference.pageStart}{reference.pageEnd ? `–${reference.pageEnd}` : ''}
      </span>
      {doiIdentifier && <span className="reference__doi">
        {isReferenceList ?
          <a href={`https://doi.org/${doiIdentifier.value}`} className="reference__doi_link">
            https://doi.org/{doiIdentifier.value}
          </a> : `https://doi.org/${doiIdentifier.value}`}
        </span>
      }
    </>
  );
};

export const Reference = ({ reference, isReferenceList = false }: { reference: ReferenceData, isReferenceList: boolean }): JSX.Element => (isReferenceList ?
  <li className="reference" id={reference.id}>{ReferenceBody({ reference, isReferenceList })}</li> :
  <div className="reference" id={reference.id}>{ReferenceBody({ reference, isReferenceList })}</div>
);

