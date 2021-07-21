import React from 'react';
import { useQuery, gql } from "@apollo/client";
import Job from './Job';
import './Jobs.css';
import { Dimmer, Loader } from 'semantic-ui-react';

const JOBS_QUERY = gql`
query getjobs{
    jobs{
        id
        title
        slug
        applyUrl
        description
        tags(first:5){
          id
          name
          slug
        }
        commitment{
            id
            title
            slug
        }
    }
  }
`;

const Jobs = () => {

    const { data, loading, error } = useQuery(JOBS_QUERY);

    if (loading) {
        return <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
        </Dimmer>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return data.jobs.map(job => {
        return <Job key={job.id} job={job} />;
    });
}

export default Jobs;