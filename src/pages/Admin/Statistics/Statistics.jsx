import React from 'react';

const Statistics = () => {
    return (
        <div>
            <h2>this is Statistics page </h2>

            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
        </div>
    );
};

export default Statistics;