import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDate, formatDistanceToNowStrict } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRelativeDate = (from: Date) => {
	const currentDate = new Date()

  const fromDate = from instanceof Date ? from : new Date(from)

  if (currentDate.getTime() - fromDate.getTime() < 24 * 60 * 60 * 1000) {
		return formatDistanceToNowStrict(fromDate, { addSuffix: true })
  } else {
		if (currentDate.getFullYear() === fromDate.getFullYear()) {
			return formatDate(fromDate, 'MMM d')
		} else {
			return formatDate(fromDate, 'MMM d, yyyy')
		}
  }
}

export const formatNumber = (n: number) =>
	Intl.NumberFormat('en-US', {
		notation: 'compact',
		maximumFractionDigits: 1
	}).format(n) 