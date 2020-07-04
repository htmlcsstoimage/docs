require 'jekyll_asset_pipeline'

module JekyllAssetPipeline
  class CssTagTemplate < JekyllAssetPipeline::Template
    def self.filetype
      '.css'
    end

    def html
      "<link href='#{output_path}/#{@filename}' rel='stylesheet' " \
        "type='text/css' defer />\n"
    end
  end
end
