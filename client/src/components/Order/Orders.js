import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* THINGS TO ADD:
- PAGINATION
- SEARCH
- FILTER FOR ORDER STATUS
*/

class Orders extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      startIndex: 0,
      endIndex: 20,
      statusView: 'all'
    }
    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onPrevPage = this.onPrevPage.bind(this)
    this.onNextPage = this.onNextPage.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value, startIndex: 0, endIndex: 20 })
  }

  onCheck(ev) {
    const { value } = ev.target
    this.setState({ statusView: value })
  }

  onPrevPage() {
    const { startIndex, endIndex } = this.state
    this.setState({ startIndex: startIndex - 20, endIndex: endIndex - 20 })
  }

  onNextPage() {
    const { startIndex, endIndex } = this.state
    this.setState({ startIndex: startIndex + 20, endIndex: endIndex + 20 })
  }

  render() {
    const { orders, user } = this.props
    const { onChange, onCheck, onNextPage, onPrevPage } = this
    const { statusView, endIndex, startIndex, name } = this.state
    const statuses = [ 'cart', 'processed', 'shipped', 'complete', 'all' ]
    const allOrders = user ? orders.filter(order => order.userId === user.id) : orders
    const ordersForStatus = allOrders.filter(order => statusView === 'all' ? order : order.status === statusView)
    const matchingOrders = ordersForStatus.reduce((memo, order) => {
      if (order.id.toString().match(name)) memo.push(order)
      return memo
    }, [])
    const ordersToShow = matchingOrders.reduce((memo, order, index) => {
      if (index < endIndex && index >= startIndex) memo.push(order)
      return memo
    }, [])
    const currentPage = endIndex / 20
    const lastPage = Math.ceil(ordersForStatus.length / 20)
    return (
      <div>
        <h2>Order history { user ? `for ${user.firstName} ${user.lastName}` : null }</h2>
        <h5>Order status</h5>
        {
          statuses.map(status => (
            <div key={ status } className="form-check form-check-inline">
              <input checked={ statusView === status } className="form-check-input" onChange={onCheck} type="radio" value={status} />
              <label className="form-check-label">{status}</label>
            </div>
          ))
        }
        <input value={ name } onChange={ onChange } className="form-control margin-t-15 margin-b-10" placeholder="Search for an order number"/>
        <ul className="list-group">
          {
            ordersToShow.map(order => (
              <div key={ order.id }>
                <li className="list-group-item">
                  <Link to={`/admin/orders/${order.id}`}>Order #{order.id}</Link>
                  <br/>Status: {order.status}
                </li>
              </div>
            ))
          }
        </ul>
        <div className="product-buttons">
          <button disabled={ startIndex < 20 } className="btn btn-outline-info prev-btn" onClick={ onPrevPage }>Previous</button>
          <button disabled className="btn btn-info">Page { currentPage } / { lastPage ? lastPage : 1 }</button>
          <button disabled={ endIndex >= ordersForStatus.length } className="btn btn-outline-info next-btn" onClick={ onNextPage }>Next</button>
        </div>
      </div>
    )
  }
}

const mapState = ({ orders, users }, { id }) => {
  const user = users.find(user => user.id === id)
  return { orders, user }
}

export default connect(mapState)(Orders);
