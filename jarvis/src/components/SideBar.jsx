import { useState } from 'react';
import { 
  Container,
  Collapse,
  Card,
  CardBody,
  Button,
  Row,
  Col
} from 'reactstrap';
import TensorInfo from './TensorInfo';
import { useWebSocket } from '../hooks/useWebSocket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/SideBar.css';  // if using approach #1
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [tensorInfoExpanded, setTensorInfoExpanded] = useState(true);
  return (
    <div 
      className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}
    >
      <Container fluid className="p-2">
        {/* Toggle Button */}
        <Button
          color="light"
          className="sidebar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            right: '10px',
            top: '20px',
            zIndex: 1000,
            borderRadius: '10%',
            width: '30px',
            height: '30px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
        </Button>

        {/* Sidebar Content */}
        {isOpen && (
          <>

            <Row className="mb-3">
              <Col>
                <Button 
                  color="primary" 
                  block
                  onClick={() => setTensorInfoExpanded(!tensorInfoExpanded)}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Create Tensor
                </Button>
              </Col>
            </Row>

            <Card className="mb-2">
              <CardBody className="p-2">
                <div 
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => setTensorInfoExpanded(!tensorInfoExpanded)}
                  style={{ cursor: 'pointer' }}
                >

                </div>
                <Collapse isOpen={tensorInfoExpanded}>
                  <div className="mt-2">
                    <TensorInfo 
                      name="tensor1"
                      dimensions="10x10"
                      dataType="float32"
                      size="100MB"
                    />
                  </div>
                </Collapse>
              </CardBody>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
};

export default SideBar;
