export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const ROLE = 'role';
export const PROFIE_PICTURE = 'profilePicture';
export const USER_DETAILS = 'userDetails';
export const ADMIN_ROLE = 'admin';
export const VERSION = 'Version';
export const PRODUCT = 'Product';

export const doughnutChartOptions = {
  legend: {
    position: 'bottom',
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false
  },
  cutoutPercentage: 80,
  layout: {
    padding: {
      bottom: 20
    }
  }
};

export const doughnutChartData = {
  labels: ['Cakes', 'Cupcakes'],
  datasets: [
    {
      label: '',
      borderColor: ['purple', 'red'],
      backgroundColor: ['yellow', 'blue'],
      borderWidth: 2,
      data: [15, 25]
    }
  ]
};

export const barChartOptions = {
  legend: {
    position: 'bottom',
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false
        },
        ticks: {
          beginAtZero: true,
          stepSize: 100,
          min: 300,
          max: 800,
          padding: 20
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ]
  }
  // tooltips: chartTooltip,
};

export const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Cakes',
      borderColor: 'blue',
      backgroundColor: 'blue',
      data: [456, 479, 324, 569, 702, 600],
      borderWidth: 2
    },
    {
      label: 'Desserts',
      borderColor: 'red',
      backgroundColor: 'red',
      data: [364, 504, 605, 400, 345, 320],
      borderWidth: 2
    }
  ]
};
