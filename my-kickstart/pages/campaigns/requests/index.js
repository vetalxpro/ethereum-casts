import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table, TableBody, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

  static async getInitialProps( props ) {
    const { address } = props.query;
    const campaign = Campaign(address);
    let requestCount = await campaign.methods.getRequestsCount().call();
    requestCount = parseInt(requestCount, 10);
    let approversCount = await campaign.methods.approversCount().call();
    approversCount = parseInt(approversCount, 10);
    const requests = await  Promise.all(
      Array(requestCount).fill(null).map(( element, index ) => {
        return campaign.methods.requests(index).call();
      })
    );
    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map(( request, index ) => {
      return <RequestRow request={request}
                         id={index}
                         key={index}
                         approversCount={this.props.approversCount}
                         address={this.props.address}
      />
    });
  }

  render() {

    return (
      <Layout>
        <h3>Pending Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary
                    floated="right"
                    style={{ marginBottom: '10px' }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Recipient</TableHeaderCell>
              <TableHeaderCell>Approval Count</TableHeaderCell>
              <TableHeaderCell>Approve</TableHeaderCell>
              <TableHeaderCell>Finalize</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.renderRows()}
          </TableBody>
        </Table>
        <p>Found {this.props.requestCount} requests.</p>
      </Layout>)
  }
}

export default RequestIndex;
