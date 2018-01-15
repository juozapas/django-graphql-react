import * as React from 'react'
import { graphql, QueryProps } from 'react-apollo'
import * as types from '../schema'
import * as Invoices from './Invoices.graphql'

interface Props {
    data: types.InvoicesQuery & QueryProps
}

class ListView extends React.Component<Props> {
    render() {
        let { data } = this.props
        console.log(this.props)

        if (data.loading || data.allInvoices === null || data.allInvoices.length === 0) {
            return <div>Loading...</div>
        }

        return (
            <div>
                {data.allInvoices.map(item => item != null ? (
                    <p key={item.id}>
                        <span>
                            {item.number}
                        </span>
                    </p>
                ) : null)}
            </div>)
    }
}

export default graphql(Invoices)(ListView)