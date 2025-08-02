/**
 * Chart utilities for handling null values and tooltip formatting
 */

/**
 * Check if a value is valid (not null, undefined, or NaN)
 * @param value - The value to check
 * @returns true if the value is valid, false otherwise
 */
export function isValidValue(value: any): boolean {
  return value !== null && value !== undefined && !Number.isNaN(value);
}

/**
 * Safe tooltip formatter that handles null values
 * @param datum - Chart data point
 * @param name - Display name for the tooltip
 * @param formatter - Optional formatter function for the value
 * @returns Formatted tooltip object
 */
export function safeTooltipFormatter(
  datum: any,
  name: string,
  formatter?: (value: any) => string
): { name: string; value: string } {
  // Check if datum exists and has a valid value
  if (!datum || !isValidValue(datum.value)) {
    return {
      name,
      value: '暂无数据'
    };
  }

  try {
    const formattedValue = formatter ? formatter(datum.value) : String(datum.value);
    return {
      name,
      value: formattedValue
    };
  } catch (error) {
    console.warn('Error formatting tooltip value:', error);
    return {
      name,
      value: '暂无数据'
    };
  }
}

/**
 * Create a safe tooltip configuration for charts
 * @param name - Display name for the tooltip
 * @param formatter - Optional formatter function for the value
 * @returns Tooltip configuration object
 */
export function createSafeTooltip(
  name: string,
  formatter?: (value: any) => string
) {
  return {
    formatter: (datum: any) => safeTooltipFormatter(datum, name, formatter)
  };
}

/**
 * Filter chart data to remove entries with null/undefined values
 * @param data - Array of chart data objects
 * @param valueField - The field name to check for valid values (default: 'value')
 * @returns Filtered array with only valid data points
 */
export function filterValidData<T extends Record<string, any>>(
  data: T[],
  valueField: string = 'value'
): T[] {
  if (!Array.isArray(data)) {
    console.warn('Chart data is not an array:', data);
    return [];
  }

  return data.filter(item => {
    if (!item || typeof item !== 'object') {
      return false;
    }

    const value = item[valueField];
    // More strict filtering to ensure clean data
    return value !== null &&
           value !== undefined &&
           !Number.isNaN(value) &&
           typeof value === 'number' &&
           isFinite(value);
  });
}

/**
 * Safe chart data getter with null value filtering
 * @param data - Chart data array
 * @param valueField - The field name to check for valid values (default: 'value')
 * @returns Filtered and validated chart data
 */
export function getSafeChartData<T extends Record<string, any>>(
  data: T[] | undefined | null, 
  valueField: string = 'value'
): T[] {
  if (!data) {
    return [];
  }
  
  return filterValidData(data, valueField);
}
