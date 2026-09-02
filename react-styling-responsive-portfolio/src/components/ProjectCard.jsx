import styled from 'styled-components';

const Card = styled.article`
  background: white;
  border: 1px solid #e2e6ef;
  border-radius: 20px;
  padding: 22px;
  min-height: 235px;
  display: flex;
  flex-direction: column;
  transition: transform .2s ease, box-shadow .2s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 40px rgba(28,39,75,.08);
  }
`;

const Number = styled.span`
  color: #5263ff;
  font-size: 13px;
  font-weight: 850;
`;

const Title = styled.h3`
  margin: 30px 0 8px;
  font-size: 22px;
`;

const Description = styled.p`
  margin: 0;
  color: #64748b;
  line-height: 1.6;
  flex: 1;
`;

const Tag = styled.span`
  align-self: flex-start;
  margin-top: 20px;
  padding: 6px 9px;
  border-radius: 8px;
  background: #f0f2ff;
  color: #4b5ce6;
  font-size: 12px;
  font-weight: 800;
`;

export default function ProjectCard({ title, type, description, tag }) {
  return (
    <Card>
      <Number>{type}</Number>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Tag>{tag}</Tag>
    </Card>
  );
}