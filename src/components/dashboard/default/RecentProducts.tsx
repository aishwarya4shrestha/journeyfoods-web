import React from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';
import { VERSION, PRODUCT } from '../../../constants/appConstant';

// import data from '../../data/products';

interface IRecentProductsProps {
  title: string;
  data: any;
}

const RecentProducts: React.SFC<IRecentProductsProps> = props => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>', props);
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <button className="btn btn-header-light icon-button">
          <i className="simple-icon-refresh" />
        </button>
      </div>
      <CardBody>
        <CardTitle>
          {props.title + ' ' + PRODUCT}
          {/* <IntlMessages id="dashboards.recent-orders" /> */}
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          {/* <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}> */}
          {props.data.map((order: any, index: number) => {
            return (
              <div key={index} className="d-flex flex-row mb-3">
                <NavLink to="/app/pages/product/details" className="d-block position-relative">
                  <img
                    src={
                      'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322284/berries-are-good-food-for-high-blood-pressure.jpg?w=1155&h=1541'
                    }
                    alt={order.name}
                    className="list-thumbnail border-0"
                  />
                  <Badge
                    key={index}
                    className="position-absolute badge-top-right"
                    color={order.active == 'yes' ? 'primary' : 'secondary'}
                    pill
                  >
                    {VERSION + ' ' + order.version}
                  </Badge>
                </NavLink>

                <div className="pl-3 pt-2 pr-2 pb-2">
                  <NavLink to="/app/pages/product/details">
                    <p className="list-item-heading">{order.name}</p>
                    <div className="pr-4">
                      <p className="text-muted mb-1 text-small">{order.user}</p>
                      <p className="text-muted mb-1 text-small">{order.dietary_type}</p>
                      <p className="text-muted mb-1 text-small">{order.product_type}</p>
                    </div>
                    <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                      {order.creation_date}
                    </div>
                    <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                      {order.modified_date}
                    </div>
                  </NavLink>
                </div>
              </div>
            );
          })}
          {/* </PerfectScrollbar> */}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentProducts;
