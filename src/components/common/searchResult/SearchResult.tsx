import * as React from 'react';
import { connect } from 'react-redux';
import CardView from '../../ui/CardView';
import { push } from 'connected-react-router';

interface ISearchResultProps {
  searchResult: any;
  changePath: (path: string) => void;
}

interface ISearchResultState {}

class SearchResult extends React.Component<ISearchResultProps, ISearchResultState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  searchItem = async (id: string) => {
    this.props.changePath(`/ingredient/${id}`);
    this.setState({
      searchKeyword: ''
    });
  };

  render() {
    console.log('this.props', this.props);
    return (
      <div className="row">
        <div className="mb-3 col-12">
          {this.props.searchResult.ingredients &&
            this.props.searchResult.ingredients.map((item: any, index: number) => {
              return (
                <div className="d-flex flex-row active card margin-btm" onClick={() => this.searchItem(item.global_id)}>
                  <a aria-current="page" className="d-flex active">
                    <img
                      alt="Bebinca"
                      src={
                        item.image_url
                          ? item.image_url
                          : 'https://s3.amazonaws.com/content.readymaderc.com/product_images/images/000/011/820/large/no_img.png?1519680147'
                      }
                      className="list-thumbnail responsive border-0 card-img-left max-img-width"
                    />
                  </a>
                  <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                    <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                      <a aria-current="page" className="w-40 w-sm-100 active">
                        <p className="list-item-heading mb-1 truncate">{item.journeyfoodsio_display_name}</p>
                      </a>
                      <p className="mb-1 text-muted text-small w-15 w-sm-100">Desserts</p>
                      <p className="mb-1 text-muted text-small w-15 w-sm-100">27.01.2019</p>
                      <div className="w-15 w-sm-100">
                        <span className="badge badge-secondary badge-pill">{item.percent_complete}% complete</span>
                      </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                      <div className="item-check mb-0 custom-checkbox custom-control">
                        <input type="checkbox" id="check_18" className="custom-control-input" />
                        {/* <label className="custom-control-label" for="check_18">
                          HELLO
                        </label> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      //   </CardView>
    );
  }
}

const mapStateToProps = (store: any) => {
  const {
    router: { location },
    dashboardReducer: { searchResult }
  } = store;
  return {
    location,
    searchResult
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  changePath: (path: string) => {
    dispatch(push(path));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
