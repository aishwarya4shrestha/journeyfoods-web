import * as React from 'react';
import { connect } from 'react-redux';

import CardView from '../../../ui/CardView';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: 'Jan',
    created: 4000,
    modified: 2400,
    amt: 2400
  },
  {
    name: 'Feb',
    created: 3000,
    modified: 1398,
    amt: 2210
  },
  {
    name: 'Mar',
    created: 2000,
    modified: 9800,
    amt: 2290
  },
  {
    name: 'Apr',
    created: 2780,
    modified: 3908,
    amt: 2000
  },
  {
    name: 'May',
    created: 1890,
    modified: 4800,
    amt: 2181
  },
  {
    name: 'Jun',
    created: 2390,
    modified: 3800,
    amt: 2500
  },
  {
    name: 'Jul',
    created: 3490,
    modified: 4300,
    amt: 2100
  }
];

const mixed = [
  {
    name: 'Sun',
    created: 1000,
    modified: 4400
  },
  {
    name: 'Mon',
    created: 7000,
    modified: 398
  },
  {
    name: 'Tue',
    created: 3000,
    modified: 8800
  },
  {
    name: 'Wen',
    created: 3780,
    modified: 9908
  },
  {
    name: 'Thur',
    created: 5890,
    modified: 1800
  },
  {
    name: 'Fri',
    created: 9390,
    modified: 4800
  },
  {
    name: 'Sat',
    created: 4490,
    modified: 1300
  }
];

const year = [
  {
    name: '2016',
    created: 3000,
    amt: 1290
  },
  {
    name: '2017',
    created: 3780,
    amt: 2000
  },
  {
    name: '2018',
    created: 5890,
    amt: 1181
  },
  {
    name: '2019',
    created: 9390,
    amt: 1500
  },
  {
    name: '2020',
    created: 4490,
    amt: 3100
  }
];
interface IAnalyticsProps {}

interface IAnalyticsState {}

class Analytics extends React.Component<IAnalyticsProps, IAnalyticsState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CardView header="Ingredient analytics">
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <div className="icon-row-item mb-4">
            <div className="card">
              <div className="text-center card-body">
                <i className="iconsminds-basket-coins" />
                <p className="card-text font-weight-semibold mb-0">
                  <span>Total Users</span>
                </p>
                <p className="lead text-center">35</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <div className="icon-row-item mb-4">
            <div className="card">
              <div className="text-center card-body">
                <i className="iconsminds-basket-coins" />
                <p className="card-text font-weight-semibold mb-0">
                  <span>Amount of Ingredients</span>
                </p>
                <p className="lead text-center">10</p>
              </div>
            </div>
          </div>
        </div>
        Change in Products in Week
        <BarChart
          width={500}
          height={300}
          data={mixed}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="created" fill="#8884d8" />
          <Bar dataKey="modified" fill="#82ca9d" />
        </BarChart>
        Change in Products in Month
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="created" fill="#8884d8" />
          <Bar dataKey="modified" fill="#82ca9d" />
        </BarChart>
        <span>Change in Products in Year</span>
        <BarChart
          width={500}
          height={300}
          data={year}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="created" fill="#8884d8" />
          <Bar dataKey="modified" fill="#82ca9d" />
        </BarChart>
      </CardView>
    );
  }
}

const mapStateToProps = (store: any) => {
  const {
    router: { location }
  } = store;
  return {
    location
  };
};

export default connect(mapStateToProps)(Analytics);
