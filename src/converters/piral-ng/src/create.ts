import type { PiralPlugin } from 'piral-core';
import { createConverter, NgConverterOptions } from './converter';
import type { PiletNgApi } from './types';

/**
 * Available configuration options for the Angular plugin.
 */
export interface NgConfig extends NgConverterOptions {}

/**
 * Creates the Pilet API extensions for Angular.
 */
export function createNgApi(config: NgConfig = {}): PiralPlugin<PiletNgApi> {
  return (context) => {
    const convert = createConverter(config);
    context.converters.ng = ({ component }) => convert(component);

    return {
      NgExtension: convert.Extension,
      fromNg(component) {
        return {
          type: 'ng',
          component,
        };
      },
    };
  };
}
