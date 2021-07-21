import React from 'react';
import { withRouter } from 'react-router';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import {
    setCompany
} from '../../features/companies/companyStore';
import './Company.css';

const Company = ({ company, history }) => {
    const dispatch = useDispatch();

    const handleClick = company => {
        if (dispatch(setCompany(company))) {
            history.push(`/companies/${company.slug}`);
        }
    }

    return (<Segment raised className="company">
        <Image src={company.logoUrl ? company.logoUrl : '/assets/image.png'} size='small' />
        <div className="company_details">
            <Header className="company_name" as="h3" onClick={() => { handleClick(company) }}>
                {company.name}
            </Header>
            <p>
                {company.websiteUrl}
            </p>
            <p>
                <Icon name="twitter" /> {company.twitter}
            </p>
        </div>
        <div>
            <button onClick={() => { handleClick(company) }} className="ui button teal">View Jobs</button>
        </div>

    </Segment>);
}

export default withRouter(Company);