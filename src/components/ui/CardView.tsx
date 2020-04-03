import * as React from 'react';
import { Row, Card, CardBody } from 'reactstrap';

import { Colxx } from '../common/CustomBootstrap';

interface IRoleConditionProps {
  header?: any;
}

const CardView: React.SFC<IRoleConditionProps> = ({ header, children }) => {
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">{header}</h6>
            {children}
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default CardView;
