import { mergeReconciler, processApis } from '@tarojs/shared';

const hostConfig = {
  initNativeApi(taro) {
    const global = taro.miniGlobal;
    processApis(taro, global, {
      transformMeta(api: string, options: Record<string, any>) {
        const routeApis = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];
        if (routeApis.includes(api)) {
          options.url = `/${options.modules}${options.url}`;
          delete options.modules;
        }
        return {
          key: api,
          options,
        };
      },
    });
  },
};

mergeReconciler(hostConfig);
