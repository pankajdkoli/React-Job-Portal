import React from 'react';
import { withRouter } from 'react-router';
import { Header, Segment, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { selectJob } from '../../features/jobs/jobsStore';
import _ from 'lodash';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import './JobProfile.css';

const JobProfile = ({ history }) => {
    const job = useSelector(selectJob);

    const listTags = (tags) => {
        return _.map(tags, tag => {
            return (<Label as='a' tag key={tag.id}>
                {tag.name}
            </Label>);
        })
    }

    return (<Segment className="job__profile">
        <div className="top_header">
            <Header as="h3">
                {job.title}
            </Header>
            <div className="apply__now">
                <a rel="noreferrer" href={job.applyUrl} target="_blank"><button className="ui button primary" >Apply Now</button></a>
            </div>
        </div>

        <div className="job__tags">
            {listTags(job.tags)}
        </div>

        <div className="job__description">
            <ReactMarkdown remarkPlugins={[gfm]}>{job.description}</ReactMarkdown>
        </div>

        <div className="apply__now">
            <a rel="noreferrer" href={job.applyUrl} target="_blank"><button className="ui button primary" >Apply Now</button></a>
        </div>
    </Segment>);
}

export default withRouter(JobProfile);