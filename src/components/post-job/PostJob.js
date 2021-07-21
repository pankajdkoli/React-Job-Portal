import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useQuery, gql } from "@apollo/client";

import './PostJob.css';
import { Dimmer, Loader, Form, Input, TextArea, Button, Dropdown } from 'semantic-ui-react';
import slugify from 'react-slugify';

const JOBS_QUERY = gql`
query getCommitments{
    commitments{
      id
      title
      slug
    }
    countries{
        id
        name
        slug
        cities{
          id
          name
          slug
        }
    }
    remotes{
        id
        name
        slug
    }
  }
`;

const POST_JOB_QUERY = gql`
mutation Mutation($postJobInput: PostJobInput!) {
    postJob(input: $postJobInput) {
      title
      description
      applyUrl
      commitment {
        id
      }
      company {
        name
      }
      countries {
        id
        name
        slug
      }
      cities {
        id
        name
        slug
      }
      remotes {
        id
        name
      }
      slug
      tags {
        name
        slug
      }
      locationNames
      userEmail
    }
  }  
`;

const PostJob = () => {

    const { data, loading, error } = useQuery(JOBS_QUERY);

    const [title, setTitle] = useState('');
    const [compnayName, setCompnayName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [applyUrl, setApplyUrl] = useState('');
    const [country, setCountry] = useState({});
    const [city, setCity] = useState({});
    const [description, setDescription] = useState('');
    const [cityOptions, setCityOptions] = useState([]);
    const [commitment, setCommitment] = useState({});
    const [remotes, setRemotes] = useState({});
    const [tagOptions, setTagOptions] = useState([]);
    const [tags, setTags] = useState([]);
    const [locationNames, setLocationNames] = useState([]);

    if (loading) {
        return <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
        </Dimmer>;
    }

    const countryOptions = _.map(data.countries, country => {
        return { key: country.id, text: country.name, value: country };
    });

    const commitmentsOptions = _.map(data.commitments, cmt => {
        return { key: cmt.id, text: cmt.title, value: cmt };
    });

    const remotessOptions = _.map(data.remotes, rmt => {
        return { key: rmt.id, text: rmt.name, value: rmt };
    });

    const handleCountryChange = (e, { value }) => {

        let options = _.map(value.cities, city => {
            return { key: city.id, text: city.name, value: city };
        });

        setCityOptions(options)

        setCountry({ id: value.id, name: value.name, slug: value.slug, __typename: value.__typename });
    }

    const handleCityChange = (e, { value }) => {
        setCity(value);
    }

    const handleAddition = (e, { value }) => {

        tagOptions.push(
            {
                key: value,
                value: {
                    name: value,
                    slug: slugify(value)
                },
                text: value
            }
        );

        console.log(tagOptions);
        setTagOptions(tagOptions);
    }

    const handleTagChange = (e, { value }) => {
        tags.push(value);
        setTags(tags);
        console.log(tags);
    }

    const handleSubmit = () => {
        console.log(title, applyUrl, country, city, description);
    }

    return (<div>
        <h2>Post New Job</h2>
        <Form onSubmit={handleSubmit}>

            <Form.Field
                control={Input}
                label='Company Name'
                placeholder='Company Name'
                value={compnayName}
                onChange={(e, { value }) => setCompnayName(value)}
                name="compnayName"
            />

            <Form.Field
                control={Input}
                label='User Email'
                placeholder='Uer Email'
                value={userEmail}
                onChange={(e, { value }) => setUserEmail(value)}
                name="compnauserEmailyName"
            />

            <Form.Field
                control={Input}
                label='Job Title'
                placeholder='Job Title'
                value={title}
                onChange={(e, { value }) => setTitle(value)}
                name="title"
            />

            <Form.Field
                control={Input}
                label='Apply URL'
                placeholder='Apply URL'
                onChange={(e, { value }) => setApplyUrl(value)}
                value={applyUrl}
            />

            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Country</label>
                    <Dropdown
                        placeholder='Select Country'
                        fluid
                        search
                        selection
                        options={countryOptions}
                        onChange={handleCountryChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <Dropdown
                        placeholder='Select City'
                        fluid
                        search
                        selection
                        options={cityOptions}
                        onChange={handleCityChange}
                    />
                </Form.Field>
            </Form.Group>
            <Form.Field
                control={TextArea}
                label='Job Description'
                placeholder='Job Description'
                value={description}
                onChange={(e, { value }) => setDescription(value)}
            />

            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Commitment</label>
                    <Dropdown
                        placeholder='Commitment'
                        fluid
                        search
                        selection
                        options={commitmentsOptions}
                        onChange={(e, { value }) => { setCommitment(value) }}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Remotes</label>
                    <Dropdown
                        placeholder='Remotes'
                        fluid
                        search
                        selection
                        options={remotessOptions}
                        onChange={(e, { value }) => { setRemotes(value) }}
                    />
                </Form.Field>

            </Form.Group>

            <Form.Field
                control={Input}
                label='Apply URL'
                placeholder='Apply URL'
                onChange={(e, { value }) => setLocationNames(value)}
                value={locationNames}
            />

            <Form.Field>
                <label>Tags</label>
                <Dropdown
                    options={tagOptions}
                    placeholder='Tags'
                    search
                    selection
                    fluid
                    multiple
                    allowAdditions
                    value={tags}
                    onAddItem={handleAddition}
                    onChange={handleTagChange}
                />
            </Form.Field>

            <Button primary>Submit</Button>

        </Form>

    </div>);
}

export default PostJob;