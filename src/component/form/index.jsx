import React from 'react';
import './index.scss'
// Create component for button
class Button extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <fieldset>
        <button
          type={this.props.type || 'button'}
          value={this.props.value || null}
          onClick={onClick}
        >
          {this.props.text}
        </button>
      </fieldset>
    );
  }
};
// Create component for select input
class Select extends React.Component {
  render() {
    // Get all options from option prop
    const selectOptions = this.props.options.split(', ');

    // Generate list of options
    const selectOptionsList = selectOptions.map((selectOption, index) => {
      return <option key={index} value={index}>{selectOption}</option>
    });

    return (
      <fieldset>
        <Label
          hasLabel={this.props.hasLabel}
          htmlFor={this.props.htmlFor}
          label={this.props.label}
        />

        <select
          defaultValue=''
          id={this.props.htmlFor}
          name={this.props.name || null}
          required={this.props.required || null}
          style={{ width: "100%" }}
          className="border-bottom-0"
        >
          <option value='' disabled>Select one option</option>

          {selectOptionsList}
        </select>
        <input type="number" className='date' placeholder='ZIP' />
      </fieldset>
    );
  }
};

// Create component for label
class Label extends React.Component {
  render() {
    if (this.props.hasLabel === 'true') {
      return <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
    }
  }
}

// Create component for input
class Input extends React.Component {
  render() {
    return (
      <fieldset>
        <Label
          hasLabel={this.props.hasLabel}
          htmlFor={this.props.htmlFor}
          label={this.props.label}
        />

        <input
          id={this.props.htmlFor}
          max={this.props.max || null}
          min={this.props.min || null}
          name={this.props.name || null}
          placeholder={this.props.placeholder || null}
          required={this.props.required || null}
          step={this.props.step || null}
          type={this.props.type || 'text'}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </fieldset>
    );
  }
}



// Create component for form
class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      isSubmitted: false,
      isError: false,
      paymentInfo: {
        email: "",
        cardNumber: "",
        date: "",
        cvc: "",
        nameOfCard: ""
      }
    }
  }

  onSubmit = () => {
    const { paymentInfo: { email, cardNumber, date, cvc, nameOfCard } } = this.state;
    if (email && cardNumber && date && cvc && nameOfCard)
      this.setState({
        isSubmitted: true,
        isError: false
      })
    else
      this.setState({
        isSubmitted: false,
        isError: true
      })
  }
  onChange = (e) => {
    this.setState({
      paymentInfo: {
        ...this.state.paymentInfo,
        [e.target.name]: e.target.value,
      }
    })
  }
  render() {
    const { isSubmitted, isError, paymentInfo } = this.state;
    return (
      <div>
        {
          isSubmitted ? <div className='submit-message'>
            <h4>
              Payment Done Successfully
            </h4>
          </div> : <form method='' action=''>
            <div className='logo-div'>
              <img src={require('./../../assets/icon/pittboss logo.png')} alt="" className='logo' />
            </div>
            <h1>Payment Information</h1>
            <Input
              hasLabel='true'
              htmlFor='emailInput'
              label='Email'
              required='true'
              type='email'
              name="email"
              onChange={this.onChange}
              value={paymentInfo.email}
            />
            <fieldset>
              <Label
                hasLabel={'true'}
                htmlFor={"card-information"}
                label={"Card information"}
              />
              <div className="number-div">
                <input
                  id={"card-info"}
                  name={"cardNumber"}
                  placeholder={"1234 1234 1234 1234"}
                  type={'text'}
                  required
                  className="border-bottom-0 number-field"
                  onChange={this.onChange}
                  value={paymentInfo.cardNumber}
                />
                <img className='payment-icon' src={require('./../../assets/icon/payment-icon.png')} alt="" />
              </div>
              <div className='flex-div'>
                <input type="number" required className='date' placeholder='MM/YY' name='date' onChange={this.onChange} value={paymentInfo.date} />
                <input type="number" required className='date' placeholder='CVC' name='cvc' onChange={this.onChange} value={paymentInfo.cvc} />
              </div>
            </fieldset>
            <Input
              hasLabel='true'
              htmlFor='textInput'
              label='Name of Card'
              required='true'
              type='text'
              name="nameOfCard"
              onChange={this.onChange}
              value={paymentInfo.nameOfCard}
            />
            <Select
              hasLabel='true'
              htmlFor='select'
              label='Country or region'
              options='United State, United kingdom, Togo, taiwan, Ukraine'
              required='true'
            />

            {isError && <p className='error'>Fill all required fields</p>
            }
            <Button
              type='submit'
              value='submit'
              text='Pay Now'
              onClick={this.onSubmit}
            />
          </form>
        }

      </div>
    )
  }
}

export default Form;