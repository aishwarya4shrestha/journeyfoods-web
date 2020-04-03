import React, { useRef } from 'react';
import { barChartOptions } from '../../../constants/appConstant';
// import ChartComponent, { Chart } from 'react-chartjs-2';
// import { Chart } from 'react-chartjs-2';

const Chart = require('react-chartjs-2').Chart;
const ChartComponent = require('react-chartjs-2');

interface IBarState {}

interface IBarProps {
  shadow: any;
  data: any;
}

class Bar extends React.Component<IBarProps, IBarState> {
  chart_instance: any;
  constructor(props: any) {
    super(props);
    if (this.props.shadow) {
      Chart.defaults.barWithShadow = Chart.defaults.bar;
      Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
        draw: function(ease: any) {
          Chart.controllers.bar.prototype.draw.call(this, ease);
          var ctx = this.chart.ctx;
          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.2)';
          ctx.shadowBlur = 7;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 7;
          ctx.responsive = true;
          Chart.controllers.bar.prototype.draw.apply(this, arguments);
          ctx.restore();
        }
      });
    }
  }

  render() {
    const { data, shadow } = this.props;

    return (
      <ChartComponent
        ref={(ref: any) => (this.chart_instance = ref && ref.chart_instance)}
        type={shadow ? 'barWithShadow' : 'bar'}
        options={{
          ...barChartOptions
        }}
        data={data}
      />
    );
  }
}

export default Bar;
