import React, { Component } from 'react'
import extend from 'lodash/extend'
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter, HitsStats, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar, CheckboxFilter, TermQuery } from 'searchkit'

import { PeopleHitsListItem } from './PeopleHitsListItem';
import { PeopleHitsGridItem } from './PeopleHitsGridItem';
import stateHashes from './models/states-hash.json';

import './stylesheets/App.css';

const host = "http://localhost:9200/bank"
const searchkit = new SearchkitManager(host);

const sourceFields = ['account_number', 'balance', 'firstname', 'lastname', 'age', 'gender', 'address', 'employer', 'email', 'city', 'state'];

const queryFields = ['firstname.keyword', 'lastname.keyword', 'address.keyword', 'employer.keyword', 'email.keyword', 'account_number'];

class App extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo">Searchkit Bank</div>
            <SearchBox autofocus={true} searchOnChange={true} queryFields={queryFields}/>
          </TopBar>

        <LayoutBody>
          <SideBar>
            <div className="filters-sidebar">
              <RangeFilter
                min={0}
                max={100}
                field="age"
                id="age"
                title="Age"
                showHistogram={true}/>
              <RefinementListFilter
                id="gender"
                title="Gender"
                field="gender.keyword"
                translations={{"F": "Female", "M": "Male"}}>
              </RefinementListFilter>
              <RefinementListFilter
                id="state"
                title="State"
                field="state.keyword"
                size={10}
                translations={stateHashes}
                orderKey="_term">
              </RefinementListFilter>
              <NumericRefinementListFilter id="balance" title="Account Balance (USD)" field="balance" options={[
                {title: 'All'},
                {title: '< $15,000', from: 0, to:15000},
                {title: '$15,000 - $45,000', from: 15000, to:45000},
                {title: '$45,000 - $90,000', from: 45000, to:90000}
              ]}>
              </NumericRefinementListFilter>
            </div>
          </SideBar>
          <LayoutResults>
            <ActionBar>
              <ActionBarRow>
                <h1 className="page-title">Accounts</h1>
                <HitsStats translations={{
                  "hitstats.results_found":"{hitCount} results found"
                }}/>
                <ViewSwitcherToggle/>
              </ActionBarRow>

              <ActionBarRow>
                <GroupedSelectedFilters/>
                <ResetFilters/>
              </ActionBarRow>

            </ActionBar>
            <ViewSwitcherHits
                hitsPerPage={10}
                sourceFilter={sourceFields}
                hitComponents={[
                  {key:"list", title:"List", itemComponent:PeopleHitsListItem, defaultOption:true},
                  {key:"grid", title:"Grid", itemComponent:PeopleHitsGridItem}
                ]}
                scrollTo="body"
            />
            <Pagination showNumbers={true}/>
          </LayoutResults>

          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;
