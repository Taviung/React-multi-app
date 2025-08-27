import styled from 'styled-components';
import ActivitiesRow from './ActivitiesRow';

const Wrapper = styled.div`
    padding: 1rem;
`;

const Heading = styled.h3`
    text-align: center;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    margin-bottom: 1rem;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
`;

const Thead = styled.thead`
    th {
        background-color: ${({ theme }) => theme.tableHeader};
        color: ${({ theme }) => theme.tableHeaderText};
        padding: 12px;
        border: 1px solid #444;
        text-align: center;
    }
`;

const Tbody = styled.tbody`
  td {
    color: ${({ theme }) => theme.text};
    padding: 12px;
    border: none;
    text-align: center;
  }

  tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.tableRowOdd};
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.tableRowEven};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.tableHover};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const Activities = ({ activity, onDelete }) => {
    return (
        <Wrapper>
            <Heading>Your current activities</Heading>
            <StyledTable>
                <Thead>
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Creation Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Delete Task</th>
                    </tr>
                </Thead>
                <Tbody>
                    {activity.map((item) => (
                        <ActivitiesRow key={item.id} item={item} onDelete={onDelete} />
                    ))}
                </Tbody>
            </StyledTable>
        </Wrapper>
    );
};

export default Activities;
