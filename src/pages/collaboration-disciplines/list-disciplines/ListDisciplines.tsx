 
import { Link } from "react-router-dom";
import './style.css';

export default function ListDisciplines() {
  return (
    <>
      <h2 className="mb-5">Collaborate dashboard</h2>

      <Stack className="mb-5 justify-content-between " direction="horizontal" gap={2}> 
        <InputGroup style={{ maxWidth: '500px'}}>
          <Form.Control
            placeholder="Discipline name"
            aria-label="Discipline name"
          />
          <Button variant="outline-primary" >
            Search
          </Button>
        </InputGroup>
        <Link className="btn btn-success mr-0 ml-auto" to={'/environment/teacher/collaboration-disciplines/create'} >Create discipline</Link>
      </Stack>

      <Tabs
        defaultActiveKey="disciplines"
        id="disciplines-tabs"
        className="w-100 mb-3 tab-content"
        justify
      >
        <Tab eventKey="disciplines" title="All">
          <Stack gap={2}>
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th>Discipline Name</th>
                  <th>Theme Name</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Programming Logic</td>
                  <td>Information Technology</td>
                  <td>Felipe Dias</td>
                </tr>
                <tr>
                  <td>Programming Logic</td>
                  <td>Information Technology</td>
                  <td>Felipe Dias</td>
                </tr>
              </tbody>
            </Table>

            <Pagination className="mx-auto mt-5">
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Stack>
        </Tab>

        <Tab eventKey="myDisciplines" title="My disciplines">
          <Stack gap={2}>
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th>Discipline Name</th>
                  <th>Theme Name</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Programming Logic</td>
                  <td>Information Technology</td>
                  <td>Felipe Dias</td>
                </tr>
                <tr>
                  <td>Programming Logic</td>
                  <td>Information Technology</td>
                  <td>Felipe Dias</td>
                </tr>
              </tbody>
            </Table>

            <Pagination className="mx-auto mt-5">
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Stack>
        </Tab>
      </Tabs>
    </>
  )
}