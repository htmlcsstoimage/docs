require "json"
require "htmlcsstoimage"

module Jekyll
  class HtmlCssToImageTag < Liquid::Tag
    attr_reader :input, :template_params, :template_id

    def initialize(tag_name, input, tokens)
      super
      @input = input
    end

    def render(context)
      key = hcti_key(context)
      # Return placeholder for local development without API key
      return "https://via.placeholder.com/600x400?text=HCTI+Image+Placeholder" unless key

      input = parse_input(@input, context)
      @template_id = input["template_id"]
      @template_params = input
      @template_params.delete("template_id")

      client = HTMLCSSToImage.new(api_key: key)
      image = client.create_image_from_template(template_id, @template_params)

      image.url
    end

    private

    def hcti_key(context)
      env_var = ENV["HCTI_API_KEY"]
      return env_var if env_var

      hcti_config = context.registers[:site].config["hcti"]
      if hcti_config
        key = hcti_config["api_key"]
      end

      return key if key
      # Return nil for local development - the tag will return a placeholder
      nil
    end

    def parse_input(input, context)
      return nil if input.nil? || input.empty?
      # Allows the use of variables
      input = Liquid::Template.parse(input).render(context)
      JSON.parse(input)
    end
  end
end

Liquid::Template.register_tag('hcti_image_url', Jekyll::HtmlCssToImageTag)
