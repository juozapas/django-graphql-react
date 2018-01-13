import gql from 'graphql-tag';
import * as React from 'react'
import { graphql } from 'react-apollo'
import  * as Invoices from './Invoices.graphql'


interface Props {
    data: {
        allInvoices: [Invoice]
        loading: boolean
    }

}

interface Invoice {
    id: string,
    number: string
}

class ListView extends React.Component<Props> {
    render() {
        let { data } = this.props
        console.log(this.props)

        if (data.loading || !data.allInvoices) {
            return <div>Loading...</div>
        }
        return (
            <div>
                {data.allInvoices.map(item => (
                    <p key={item.id}>
                        <div>
                            {item.number}
                        </div>
                    </p>
                ))}
            </div>)
    }
}
console.log('gql', Invoices)
export default graphql(gql(Invoices))(ListView as any)