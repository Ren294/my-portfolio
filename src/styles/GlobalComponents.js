import styled from "styled-components";

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background1};
  max-width: 1200px;
  margin: 0 auto;
  width: 67%;
`;

export const SectionDivider = styled.div`
  width: 5rem;
  height: 5px;
  background: ${({ theme }) => theme.colors.primary};
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text1};
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-left: 2%;
`;

export const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text2};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`; 