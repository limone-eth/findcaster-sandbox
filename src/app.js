// const { pipeline } = await import('@xenova/transformers');

import { pipeline, env } from '@xenova/transformers';

class MyClassificationPipeline {
  static task = 'text-classification';

  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // NOTE: Uncomment this to change the cache directory
      // env.cacheDir = './.cache';

      this.instance = pipeline(this.task, this.model, { progress_callback });

      console.log(await this.instance);
    }

    return this.instance;
  }
}

// Comment out this line if you don't want to start loading the model as soon as the server starts.
// If commented out, the model will be loaded when the first request is received (i.e,. lazily).
MyClassificationPipeline.getInstance();
