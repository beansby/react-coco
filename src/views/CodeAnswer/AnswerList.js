import React from "react";
import axios from "axios";
import '../../css/AnswerList.css';

function AnswerList() {


    const [member, setMember] = useState([]);

    return (
        <div>
            {/*닉네임*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center' md='4'>
                    <label className='labels' htmlFor='#nickname'>
                        <FontAwesomeIcon icon={faUserPen}/>
                        &nbsp;
                        NICKNAME
                    </label>
                </Col>

                <Col className='align-self-center' md='6'>
                    <FormGroup>
                        <Input type='text' defaultValue='받아온 데이터' id='nickname'
                               name='nickname' required/>
                    </FormGroup>
                </Col>

                <Col className='align-self-center' md='2'>
                    <Button> 중복체크 </Button>
                </Col>
            </Row>
        </div>

export default AnswerList;