import React from 'react';
import { withRouter } from 'react-router';
import { Header, Icon, Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { selectCompany } from '../../features/companies/companyStore';
import './CompanyProfile.css';
import Job from '../jobs/Job';
import _ from 'lodash';

const CompanyProfile = ({ history }) => {

    const company = useSelector(selectCompany);

    return (
        <React.Fragment>
            <div className="profile_header">
                <span>

                    <Image src={company.logoUrl ? company.logoUrl : '/assets/image.png'} size='tiny' circular />

                </span>

                <div>

                    <h1>Jobs at {company.name}</h1>

                </div>

                <div>

                    <p>
                        {company.websiteUrl}
                    </p>
                    <p>
                        <Icon name="twitter" /> {company.twitter}
                    </p>

                </div>
            </div>
            <div className="jobs_listing">
                {
                    _.map(company.jobs, job => <Job key={job.id} job={job} />)
                }
            </div>
        </React.Fragment>
    );
}

export default withRouter(CompanyProfile);