import React, { Component } from 'react';
import { Button, TableCell, TableRow } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
  state = {};

  onApprove = async () => {
    const { id, address } = this.props;
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[ 0 ]
    });
  }

  onFinalize = async () => {
    const { id, address } = this.props;
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[ 0 ]
    });
  }

  render() {
    const { id, request, address, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    return (
      <TableRow disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <TableCell>{id}</TableCell>
        <TableCell>{request.description}</TableCell>
        <TableCell>{web3.utils.fromWei(request.value, 'ether')}</TableCell>
        <TableCell>{request.recipient}</TableCell>
        <TableCell>
          {request.approvalCount}/{approversCount}
        </TableCell>
        <TableCell>
          {request.complete ? null : (
            <Button positive
                    basic
                    onClick={this.onApprove}>
              Approve
            </Button>)
          }
        </TableCell>
        <TableCell>
          {request.complete ? null : (
            <Button negative
                    basic
                    onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  }
}

export default RequestRow;
