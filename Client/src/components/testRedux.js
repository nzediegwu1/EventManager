import React from 'react';
import { FormGroup } from './formGroup';
import emailIcon from '../resources/images/glyphicons-11-envelope.png';
import { connect } from 'react-redux';
import { addArticle } from '../actions/articles'

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => {
  return { inputType, inputName, placeholder, className, ref, required };
};
const mapStateToProps = state => {
  return { articles: state.articles };
};

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
};

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const title = this.article.value;
    this.props.addArticle({ title });
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <fieldset>
            <FormGroup image={emailIcon} alt='email' inputProps={inputAttrs('text', 'article', 'write article', 'form-control input-sm', (input) => this.article = input, 'required')} />
            <div className="form-group">
              <input onClick={this.handleSubmit} className="btn btn-lg btn-primary btn-block modal-theme send-password" value="Submit" type="submit" />
            </div>
          </fieldset>
        </div>
        <div className="col-sm-8">
          <ul className='list-group'>
            {this.props.articles.map(item =>
              <li className='list-group-item'>{item.title}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
export const TestRedux = connect(mapStateToProps, mapDispatchToProps)(ArticlePage);