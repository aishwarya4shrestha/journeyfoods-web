import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Table } from 'reactstrap';

import { changeOptimization, editProductInformation, getIngredient } from '../../../service/api/overview.service';
import Loader from '../../common/Loader';
import CardView from '../../ui/CardView';
import { notify } from '../../../utils/notification';
import { messageStatus } from '../../../constants/messageStatus';
import { changeVersion } from '../../../actions/overview.actions';

interface ISearchedProductProps {
  match: any;
  getIngredient: (id: string) => void;
  currentIngredient: any;
  changeVersion: (id: string) => void;
  changeOptimization: (id: string, optimizationType: string, opt: string) => void;
  editProductInformation: (id: string, data: any) => void;
}

interface ISearchedProductState {
  product: any;
  isLoading: boolean;
  isEdit: boolean;
}

interface ICurrentProductInfo {
  product_type: string;
  dietary_type: string;
  manufacturer: string;
  product_ingredients: any;
  product_size: string;
  cost: string;
  creation_date: string;
  fulfillment_date: string;
  product_notes: string;
  id: string;
  version: string;
  product_name: string;
}

interface IProductInfo {
  currentIngredient: any;
  convertHtmlToPdf: () => void;
}

class SearchedProduct extends React.Component<ISearchedProductProps, ISearchedProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      product: {},
      isLoading: false,
      isEdit: false
    };
  }

  async componentDidMount() {
    await this.fetchIngredient();
  }

  fetchIngredient = async () => {
    const ingredientId = this.props.match.params.id;
    this.setState({
      isLoading: true
    });
    try {
      await this.props.getIngredient(ingredientId);
      this.setState({
        isLoading: false
      });
    } catch (e) {
      this.setState({
        isLoading: false
      });
      notify(messageStatus.ERROR, e.response);
    }
  };

  convertHtmlToPdf = () => {
    fetch('https://v2018.api2pdf.com/chrome/html', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: '2b0d7f07-d61d-477a-8591-a71ca7b556da' //Get your API key from https://portal.api2pdf.com
      },
      body: JSON.stringify({ html: '<p>hello world from reactjs</p>', inlinePdf: true, fileName: 'test.pdf' })
    })
      .then(res => res.json())
      .then(res => console.log(res.pdf));
  };

  render() {
    /**
     *
     *
     * TODO: Finalize and only work on this page, skip for now
     *
     *
     *
     * **/
    let theElement = null;

    if (this.props.currentIngredient) {
      theElement = (
        <Container fluid>
          <Row>
            <Col>
              <h2>Ingredient information</h2>
              <React.Fragment>
                <ProductInfo
                  currentIngredient={this.props.currentIngredient}
                  convertHtmlToPdf={this.convertHtmlToPdf}
                />
              </React.Fragment>
            </Col>
          </Row>
        </Container>
      );
    } else {
      theElement = <Loader />;
    }

    return <React.Fragment>{this.state.isLoading ? <Loader /> : theElement}</React.Fragment>;
  }
}

const ProductInfo: React.SFC<IProductInfo> = ({ currentIngredient }) => {
  const {
    image_url,
    journeyfoodsio_display_name,
    nutritional_summary,
    scientific_name,
    cholesterol,
    news_results,
    calcium_ca,
    calories,
    copper_cu,
    carbohydrate_by_difference,
    dietary_functional,
    fatty_acids_total_monounsaturated,
    fatty_acids_total_saturated,
    fatty_acids_total_trans,
    fiber_total_dietary,
    folate_dfe,
    food_categories,
    iron_fe,
    magnesium_mg,
    manganese_mn,
    niacin,
    pantothenic_acid,
    phosphorus_p,
    potassium_k,
    process_tags,
    protein,
    riboflavin,
    selenium_se,
    sodium_na
  } = currentIngredient;
  return (
    <CardView header={journeyfoodsio_display_name}>
      <CardView header="">
        <div className="col-6 glide__slide">
          <img alt="detail" src={image_url} className="responsive border-0 border-radius img-fluid mb-3" />
        </div>
        <Table bordered className="col-12">
          <thead>
            <tr>
              <th>Ingredient name</th>
              <th>Summary</th>
              <th>Scientific name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(currentIngredient).length > 0 && (
              <tr>
                <td>{journeyfoodsio_display_name}</td>
                <td>{nutritional_summary} </td>
                <td>{scientific_name}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </CardView>
      {/* <CardView header="Ingredient information">
       
      </CardView> */}
      <CardView header="Nutrition information">
        <Table bordered className="col-12">
          {/* <thead>
            <tr>
              <th>cholesterol</th>
              <th>Summary</th>
              <th>Scientific name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{cholesterol}</td>
              <td>{nutritional_summary} </td>
              <td>{scientific_name}</td>
            </tr>
          </tbody> */}
          <thead>
            <tr>
              <th>Calcium Ca</th>
              <th>Calories</th>
              <th>Carbohydrate By Difference</th>
              {/* <th>Cholesterol</th>
              <th>Copper Cu</th>
              <th>Dietary Functional</th>
              <th>Fatty Acids Total Monounsaturated</th>
              <th>Fatty Acids Total Polyunsaturated</th>
              <th>Fatty Acids Total Saturated</th>
              <th>Fatty Acids Total Trans</th>
              <th>Fiber Total Dietary</th>
              <th>Folate Dfe</th>
              <th>Food Categories</th> */}
              {/* <th>Iron Fe</th> */}
              {/* <th>Magnesium Mg</th>
              <th>Manganese Mn</th>
              <th>Niacin</th>
              <th>Nutritional Summary</th>
              <th>Pantothenic Acid</th>
              <th>Phosphorus P</th>
              <th>Potassium K</th>
              <th>Process Tags</th>
              <th>Protein</th>
              <th>Riboflavin</th>
              <th>Scientific Name</th>
              <th>Selenium Se</th>
              <th>Sodium Na</th>
              <th>Sub Categories</th>
              <th>Sugars Total</th>
              <th>Thiamin</th>
              <th>Total Lipid Fat </th>
              <th>Vitamin A Rae</th>
              <th>Vitamin B 12</th>
              <th>Vitamin B 6</th>
              <th>Vitamin C Total Ascorbic Acid</th>
              <th>Vitamin D D2 D3 </th>
              <th>Vitamin E Alpha Tocopherol </th>
              <th>Vitamin K Phylloquinone </th>
              <th>Zinc Zn</th>
              <th>Biotin</th>
              <th>Category</th>
              <th>Chromium</th>
              <th>Insoluble Fiber</th>
              <th>Iodine</th>
              <th>Molybdenum</th>
              <th>Percent Complete</th>
              <th>Soluble Fiber</th>
              <th>Sugar Alcohol</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{calcium_ca ? calcium_ca : 'UNAVAILABLE'}</td>
              <td>{calories ? calories : 'UNAVAILABLE'}</td>
              <td>{carbohydrate_by_difference ? carbohydrate_by_difference : 'UNAVAILABLE'}</td>
              {/* <td>{cholesterol ? cholesterol : 'UNAVAILABLE'}</td>
              <td>{copper_cu ? copper_cu : 'UNAVAILABLE'}</td>
              <td>{dietary_functional ? dietary_functional : 'UNAVAILABLE'}</td>
              <td>{fatty_acids_total_monounsaturated ? fatty_acids_total_monounsaturated : 'UNAVAILABLE'}</td>
              <td>{fatty_acids_total_monounsaturated ? fatty_acids_total_monounsaturated : 'UNAVAILABLE'}</td>
              <td>{fatty_acids_total_saturated ? fatty_acids_total_saturated : 'UNAVAILABLE'}</td>
              <td>{fatty_acids_total_trans ? fatty_acids_total_trans : 'UNAVAILABLE'}</td>
              <td>{fiber_total_dietary ? fiber_total_dietary : 'UNAVAILABLE'}</td>
              <td>{folate_dfe ? folate_dfe : 'UNAVAILABLE'}</td>
              <td>
                {food_categories ? (
                  <span className="badge badge-secondary badge-pill">{food_categories}</span>
                ) : (
                  'UNAVAILABLE'
                )}
              </td> */}
              {/* <td>{iron_fe ? iron_fe : 'UNAVAILABLE'}</td> */}
              {/* <td>{magnesium_mg}</td>
              <td>{manganese_mn}</td>
              <td>{niacin}</td>
              <td>{nutritional_summary}</td>
              <td>{pantothenic_acid}</td>
              <td>{phosphorus_p}</td>
              <td>{potassium_k}</td>
              <td>{process_tags}</td>
              <td>{protein}</td>
              <td>{riboflavin}</td>
              <td>{scientific_name}</td>
              <td>{selenium_se}</td>
              <td>{sodium_na}</td>
              <td>{currentIngredient.sub_categories}</td>
              <td>{currentIngredient.sugars_total}</td>
              <td>{currentIngredient.thiamin}</td>
              <td>{currentIngredient.total_lipid_fat}</td>
              <td>{currentIngredient.vitamin_a_rae}</td>
              <td>{currentIngredient.vitamin_b_12}</td>
              <td>{currentIngredient.vitamin_b_6}</td>
              <td>{currentIngredient.vitamin_c_total_ascorbic_acid}</td>
              <td>{currentIngredient.vitamin_d_d2_d3}</td>
              <td>{currentIngredient.vitamin_e_alpha_tocopherol}</td>
              <td>{currentIngredient.vitamin_k_phylloquinone}</td>
              <td>{currentIngredient.zinc_zn}</td>
              <td>{currentIngredient.biotin}</td>
              <td>{currentIngredient.category}</td>
              <td>{currentIngredient.chromium}</td>
              <td>{currentIngredient.insoluble_fiber}</td>
              <td>{currentIngredient.iodine}</td>
              <td>{currentIngredient.molybdenum}</td>
              <td>{currentIngredient.percent_complete}</td>
              <td>{currentIngredient.soluble_fiber}</td>
              <td>{currentIngredient.sugar_alcohol}</td> */}
            </tr>
          </tbody>
        </Table>
      </CardView>
      <CardView header="News">
        {news_results &&
          news_results.map((item: any, index: number) => {
            return (
              <div className="col-12">
                <div className="card d-flex mb-3 card">
                  <div className="d-flex flex-grow-1 min-width-zero">
                    <div className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center card-body">
                      <a
                        className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
                        id="toggler1"
                        href={item.link}
                        target="_blank"
                      >
                        <i className="simple-icon-refresh heading-icon" />
                        <span className="align-middle d-inline-block">
                          {item.title.length > 0 ? item.title : 'No title available'}
                        </span>
                      </a>
                      <p className="mb-1 text-muted text-small w-15 w-xs-100">{item.link}</p>
                      <div className="w-15 w-xs-100">
                        <span className="badge badge-secondary badge-pill">{item.source}</span>
                      </div>
                      <div className="w-15 w-xs-100">
                        <span className="badge badge-primary badge-pill">{item.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-1">
                    <p className="mb-0">{item.snippet}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </CardView>

      {/* <Row>
        <Colxx xxs="12" lg="6" className="mb-5">
          <CardSubtitle>Information Percentage</CardSubtitle>
          <div className="chart-container">
            <Doughnut shadow data={doughnutChartData} />
          </div>
        </Colxx>
      </Row> */}
      {/* <Table bordered>
      <thead>
        <tr>
          <th>Report name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {loggedinUserReports.length > 0 &&
          loggedinUserReports.map((report: any, index: number) => {
            return (
              <tr key={index}>
                <td>{report.name}</td>
                <td>{report.creation_date} </td>
                <td>{report.status}</td>
                <td>
                  {report.pdf && (
                    <a href={report.pdf} target="_blank">
                      View Report
                    </a>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table> */}
    </CardView>
  );
};

const mapStateToProps = (store: any) => {
  const {
    router: { location },
    overviewReducer: { currentIngredient }
  } = store;
  return {
    location,
    currentIngredient
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getIngredient: (id: string) => dispatch(getIngredient(id)),
  changeVersion: (id: string) => dispatch(changeVersion(id)),
  changeOptimization: (id: string, optimizationType: string, opt: string) =>
    dispatch(changeOptimization(id, optimizationType, opt)),
  editProductInformation: (id: string, data: any) => dispatch(editProductInformation(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchedProduct);
