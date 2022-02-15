import { Card, Col, Row, Input } from 'antd';
import millify from 'millify';
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100

    const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setCryptos(cryptoList?.data?.coins)
        const filteredData = cryptoList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        setCryptos(filteredData)
    }, [cryptoList, searchTerm]);

    if (isFetching) {
        return 'Loading...'
    }

    const renderedCryptos = cryptos?.map(crypto =>
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
            <Link to={`/crypto/${crypto.id}`}>
                <Card
                    title={`${crypto.rank}. ${crypto.name}`}
                    extra={<img alt='' className='crypto-image' src={crypto.iconUrl} />}
                    hoverable
                >
                    <p>Price: {millify(crypto.price)}</p>
                    <p>Market Cap: {millify(crypto.marketCap)}</p>
                    <p>Daily Change: {millify(crypto.change)}</p>
                </Card>
            </Link>
        </Col>
    )

    return (
        <Fragment>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurrency' onChange={(e) => { setSearchTerm(e.target.value) }} />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {renderedCryptos}
            </Row>
        </Fragment>
    )
}

export default Cryptocurrencies