import './Correction.css'

function Correction(props) {

    return (

        <div className='test-for-popup' >

            <div className='test-header'>
                test: #{props.index + 1}
            </div>
            <label>Input</label>
            <pre>
                {props.test.input}
            </pre>
            <label>Your Result</label>
            <pre>
                {props.test.output}
            </pre>
            <label>Expected result</label>
            <pre>
                {props.test.expectedResult}
            </pre>
            <label>Status</label>
            {(props.test.status === true) ?
                <pre style={{ backgroundColor: 'green' }}>
                    Good
                </pre>
                :
                <pre style={{ backgroundColor: 'red' }}>
                    Error
                </pre>
            }
        </div>
    )
}

export default Correction;
