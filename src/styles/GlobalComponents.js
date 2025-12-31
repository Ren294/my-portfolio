import styled from "styled-components";

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background1};
  max-width: 1200px;
  margin: 0 auto;
  width: 90%;
  position: relative;

  @media (max-width: 768px) {
    width: 95%;
    padding: ${({ theme }) => theme.spacing.xl} 0;
  }
`;

export const SectionDivider = styled.div`
  width: 4rem;
  height: 3px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.03em;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

export const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text2};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.background1};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: ${({ theme }) => theme.transitions.default};
  border: 1px solid ${({ theme }) => theme.colors.border1};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.hover};
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.border2};
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.colors.background2};
  color: ${({ theme }) => theme.colors.text2};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid ${({ theme }) => theme.colors.border1};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background3};
    border-color: ${({ theme }) => theme.colors.border2};
  }
`; 