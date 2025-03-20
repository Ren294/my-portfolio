import styled from "styled-components";

export const AchievementList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const AchievementTag = styled.span`
  background: ${({ theme }) => theme.colors.background2};
  color: ${({ theme }) => theme.colors.text2};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.875rem;
`; 