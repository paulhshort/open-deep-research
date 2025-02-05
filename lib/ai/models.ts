// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'o3-mini', // Added o3-mini model option
    label: 'o3-mini', // Added o3-mini model option
    apiIdentifier: 'o3-mini', // Added o3-mini model option
    description: 'Fast, cost-effective reasoning', // Added o3-mini model option
  },
  {
    id: 'o1', // Added o1 model option
    label: 'o1', // Added o1 model option
    apiIdentifier: 'o1', // Added o1 model option
    description: 'Powerful reasoning for complex tasks', // Added o1 model option
  },
  {
    id: 'o1-mini', // Added o1-mini model option
    label: 'o1-mini', // Added o1-mini model option
    apiIdentifier: 'o1-mini', // Added o1-mini model option
    description: 'Balanced reasoning and speed', // Added o1-mini model option
  },
  {
    id: 'gpt-4o-mini', // Added gpt-4o-mini model option
    label: 'GPT 4o Mini', // Added gpt-4o-mini model option
    apiIdentifier: 'gpt-4o-mini', // Added gpt-4o-mini model option
    description: 'Faster and cheaper GPT-4o', // Added gpt-4o-mini model option
  },
  // {
  //   id: 'gpt-4o',
  //   label: 'GPT 4o',
  //   apiIdentifier: 'gpt-4o',
  //   description: 'For complex, multi-step tasks',
  // },
] as const;

export const DEFAULT_MODEL_NAME: string = 'o3-mini'; // Corrected default model to o3-mini
