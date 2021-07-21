import React from 'react';
import { withRouter } from 'react-router';
import { Header, Segment, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import {
    setJob
} from '../../features/jobs/jobsStore';
import _ from 'lodash';
import './Job.css';

const Job = ({ job, history }) => {
    const dispatch = useDispatch();

    const handleClick = job => {
        if (dispatch(setJob(job))) {
            history.push(`/jobs/${job.slug}`);
        }
    }

    const listTags = (tags) => {
        return _.map(tags, tag => {
            return (<Label as='a' tag key={tag.id}>
                {tag.name}
            </Label>);
        })
    }

    return (<Segment raised className="job">
        <div>
            <Header onClick={() => { handleClick(job) }} as="h3" className="job__heading">
                {job.title}
            </Header>
        </div>

        <div className="job_tags">
            {listTags(job.tags)}
        </div>

        <div>

            <a rel="noreferrer" href={job.applyUrl} target="_blank"><button className="ui button blue" >Apply</button></a>

        </div>
    </Segment>);
}

export default withRouter(Job);