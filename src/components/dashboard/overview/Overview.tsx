import * as React from 'react';

import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import ActiveProducts from '../default/ActiveProducts';

const Overview: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <h1>
            <span>Default</span>
          </h1>
          <nav className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a aria-current="page" className="active" href="/">
                  <span>Home</span>
                </a>
              </li>
              <li className="breadcrumb-item">
                <a aria-current="page" className="active" href="/app/dashboards">
                  <span>Dashboards</span>
                </a>
              </li>
              <li className="active breadcrumb-item" aria-current="page">
                <span>Default</span>
              </li>
            </ol>
          </nav>
          <div className="separator mb-5" />
        </div>
      </div>
      <div className="row">
        <div className="icon-cards-row mb-4 col-md-12">
          <React.Fragment>
            <div className="icon-row-item mb-4 col-md-6">
              <div className="icon-row-item mb-4">
                <div className="card">
                  <div className="text-center card-body">
                    <i className="iconsminds-clock" />
                    <p className="card-text font-weight-semibold mb-0">
                      <span>Subscribed Ingredients</span>
                    </p>
                    <p className="lead text-center">14</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="icon-row-item mb-4 col-md-6">
              <div className="icon-row-item mb-4">
                <div className="card">
                  <div className="text-center card-body">
                    <i className="iconsminds-clock" />
                    <p className="card-text font-weight-semibold mb-0">
                      <span>Watched Ingredients</span>
                    </p>
                    <p className="lead text-center">14</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="icon-row-item mb-4 col-md-6">
              <div className="icon-row-item mb-4">
                <div className="card">
                  <div className="text-center card-body">
                    <i className="iconsminds-clock" />
                    <p className="card-text font-weight-semibold mb-0">
                      <span>Active Ingredients</span>
                    </p>
                    <p className="lead text-center">14</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="icon-row-item mb-4 col-md-6">
              <div className="icon-row-item mb-4">
                <div className="card">
                  <div className="text-center card-body">
                    <i className="iconsminds-clock" />
                    <p className="card-text font-weight-semibold mb-0">
                      <span>Concept Products</span>
                    </p>
                    <p className="lead text-center">14</p>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        </div>
      </div>

      <Row>
        <Colxx lg="12" xl="6" className="mb-4">
          <ActiveProducts />
        </Colxx>
        <Colxx lg="12" xl="6" className="mb-4">
          <ActiveProducts />
        </Colxx>
      </Row>
    </React.Fragment>
  );
};

export default Overview;
