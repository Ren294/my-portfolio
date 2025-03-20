import styled from "styled-components";

export const Box = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background1};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: ${({ theme }) => theme.transitions.default};
  border: 0px solid black;
`;

export const Boxes = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const BoxNum = styled.h5`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const BoxText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text2};
  margin-bottom: 10px;
  line-height: 1.6;
`;

export const IssuerText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text1};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const DateText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`; 