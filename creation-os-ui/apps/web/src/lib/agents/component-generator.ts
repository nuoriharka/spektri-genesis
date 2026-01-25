import { NaturalLanguageProcessor, ParsedIntent } from './natural-language-processor'

interface ComponentBlueprint {
  name: string
  type: 'functional' | 'class'
  props: Record<string, any>
  styling: string[]
  behavior: string[]
  accessibility: string[]
  tests: string[]
}

export class ComponentGeneratorAgent {
  private nlp: NaturalLanguageProcessor
  
  constructor() {
    this.nlp = new NaturalLanguageProcessor()
  }
  
  async generateFromDescription(description: string): Promise<{
    component: string
    tests: string
    story: string
    explanation: string
  }> {
    // Parse natural language
    const intent = await this.nlp.processNaturalLanguage(description)
    
    // Create blueprint
    const blueprint = await this.createBlueprint(intent)
    
    // Generate code
    const component = await this.generateComponentCode(blueprint)
    const tests = await this.generateTestCode(blueprint)
    const story = await this.generateStoryCode(blueprint)
    const explanation = await this.generateExplanation(blueprint, description)
    
    return { component, tests, story, explanation }
  }
  
  private async createBlueprint(intent: ParsedIntent): Promise<ComponentBlueprint> {
    // Map natural language to component blueprint
    const type = intent.parameters.type || 'button'
    const name = this.generateComponentName(type)
    
    return {
      name,
      type: 'functional',
      props: this.inferProps(intent),
      styling: this.inferStyling(intent),
      behavior: this.inferBehavior(intent),
      accessibility: this.generateA11y(intent),
      tests: this.generateTestCases(intent)
    }
  }
  
  private async generateComponentCode(blueprint: ComponentBlueprint): Promise<string> {
    const prompt = `
Luo React TypeScript komponentti seuraavien speksien mukaan:

Nimi: ${blueprint.name}
Props: ${JSON.stringify(blueprint.props)}
Styling: ${blueprint.styling.join(', ')}
Toiminnallisuus: ${blueprint.behavior.join(', ')}
Saavutettavuus: ${blueprint.accessibility.join(', ')}

Käytä:
- TypeScript
- Tailwind CSS
- Proper ARIA attributes
- React hooks tarvittaessa

Palauta vain komponentti koodi ilman selityksiä.
`

    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type: 'component' })
      })
      
      const result = await response.json()
      return result.code
    } catch (error) {
      // Fallback to template-based generation
      return this.generateTemplateComponent(blueprint)
    }
  }
  
  private generateTemplateComponent(blueprint: ComponentBlueprint): string {
    const { name, props } = blueprint
    
    return `
import React from 'react'
import { cn } from '@/lib/utils'

interface ${name}Props {
  ${Object.entries(props).map(([key, type]) => `${key}?: ${type}`).join('\n  ')}
  className?: string
}

export const ${name}: React.FC<${name}Props> = ({
  ${Object.keys(props).join(',\n  ')},
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "${blueprint.styling.join(' ')}",
        className
      )}
      {...props}
    >
      ${blueprint.behavior.includes('text') ? '{children}' : 'Click me'}
    </button>
  )
}

export default ${name}
`
  }
  
  private generateComponentName(type: string): string {
    const baseName = type.charAt(0).toUpperCase() + type.slice(1)
    return `Custom${baseName}`
  }
  
  private inferProps(intent: ParsedIntent): Record<string, any> {
    const props: Record<string, any> = {}
    
    if (intent.parameters.color) props.color = 'string'
    if (intent.parameters.size) props.size = 'string'
    if (intent.parameters.action) props.onClick = '() => void'
    if (intent.entities.includes('teksti') || intent.entities.includes('text')) {
      props.children = 'React.ReactNode'
    }
    
    return props
  }
  
  private inferStyling(intent: ParsedIntent): string[] {
    const styles: string[] = ['px-4', 'py-2', 'rounded']
    
    // Color mapping
    const colorMap: Record<string, string> = {
      'sininen': 'bg-blue-500 text-white',
      'vihreä': 'bg-green-500 text-white',
      'punainen': 'bg-red-500 text-white',
      'blue': 'bg-blue-500 text-white',
      'green': 'bg-green-500 text-white',
      'red': 'bg-red-500 text-white'
    }
    
    // Size mapping
    const sizeMap: Record<string, string> = {
      'iso': 'text-lg px-6 py-3',
      'pieni': 'text-sm px-2 py-1',
      'large': 'text-lg px-6 py-3',
      'small': 'text-sm px-2 py-1'
    }
    
    // Apply color
    const color = intent.parameters.color || intent.entities.find(e => colorMap[e])
    if (color && colorMap[color]) {
      styles.push(colorMap[color])
    } else {
      styles.push('bg-gray-500 text-white')
    }
    
    // Apply size
    const size = intent.parameters.size || intent.entities.find(e => sizeMap[e])
    if (size && sizeMap[size]) {
      styles.push(sizeMap[size])
    }
    
    return styles
  }
  
  private inferBehavior(intent: ParsedIntent): string[] {
    const behaviors: string[] = []
    
    if (intent.entities.includes('klikkaa') || intent.entities.includes('click')) {
      behaviors.push('clickable')
    }
    
    if (intent.entities.includes('hover')) {
      behaviors.push('hover:opacity-80')
    }
    
    return behaviors
  }
  
  private generateA11y(intent: ParsedIntent): string[] {
    return [
      'aria-label',
      'keyboard-accessible',
      'focus-visible:ring-2'
    ]
  }
  
  private generateTestCases(intent: ParsedIntent): string[] {
    return [
      'renders correctly',
      'handles click events',
      'applies correct styling',
      'is accessible'
    ]
  }
  
  private async generateTestCode(blueprint: ComponentBlueprint): Promise<string> {
    // Simple Jest/Testing Library test template
    return `import { render, screen, fireEvent } from '@testing-library/react';
import { ${blueprint.name} } from './${blueprint.name}';

describe('${blueprint.name}', () => {
  it('renders correctly', () => {
    render(<${blueprint.name} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
`;
  }

  private async generateStoryCode(blueprint: ComponentBlueprint): Promise<string> {
    // Simple Storybook story template
    return `import React from 'react';
import { ${blueprint.name} } from './${blueprint.name}';

export default {
  title: 'Components/${blueprint.name}',
  component: ${blueprint.name},
};

export const Default = () => <${blueprint.name} />;
`;
  }
  
  private async generateExplanation(blueprint: ComponentBlueprint, originalDescription: string): Promise<string> {
    return `
Loin "${blueprint.name}" komponentin seuraavasti:

Alkuperäinen pyyntö: "${originalDescription}"

Toteutus:
- Tyyppi: ${blueprint.type} React komponentti
- Styling: ${blueprint.styling.join(', ')}
- Toiminnallisuus: ${blueprint.behavior.join(', ')}
- Saavutettavuus: ${blueprint.accessibility.join(', ')}

Komponentti on valmis käyttöön ja sisältää TypeScript tuen, Tailwind CSS styling ja proper accessibility attributes.
`
  }
}
