import React, { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import Company from './Company';
import './Companies.css';
import { Dimmer, Loader, Dropdown } from 'semantic-ui-react';

const COMPANIES_QUERY = gql`
query getCompanies{
    companies{
      id
      name
      slug
      websiteUrl
      logoUrl
      jobs{
        id
        title
        slug
        description
        tags(first:4){
          id
          name
          slug
        }
      }
      twitter
      createdAt
    }
  }
`;

const Companies = () => {

  const { data, loading, error } = useQuery(COMPANIES_QUERY);

  const [filter, setFilter] = useState('');

  if (loading) {
    return <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const listCompanies = companies => {
    return companies.map(company => {
      return <Company key={company.id} company={company} />;
    });
  }

  const handleFilterChange = (event, { value }) => {
    setFilter(value);
  }

  const filterOptions = [
    { key: 'full-time', text: 'Full Time Jobs', value: 'full-time' },
    { key: 'part-time', text: 'Part Time Jobs', value: 'part-time' },
    { key: 'remote', text: 'Remote Jobs', value: 'remote' },
    { key: 'onsite', text: 'Onsite Jobs', value: 'onsite' },
  ];

  return (
    <div>
      <div className="filter_header">

        <Dropdown placeholder='Filter' clearable onChange={handleFilterChange} selection value={filter} options={filterOptions} />

      </div>

      {listCompanies(data.companies)}
    </div>
  )

}

export default Companies;