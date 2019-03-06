# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

titles = ['Kelbessa Negewo', 'State of Conflict', "A Convict's Odyssey" ,
          'Hitting Bottom', 'I Want This Apartment',]

descriptions = ['In the 1970s, Kelbessa Negewo was a midlevel administrator'\
                'in Ethiopia’s brutal Red Terror regime. In the 1990s'\
                'he was a bellhop in an Atlanta hotel.'\
                'Then someone he had tortured back home recognized him.',
                'How a tiny protest at the University of Nebraska turned'\
                'into a proxy war for the future of campus politics.',
                'When he was 16, Mark Clements talked his way into four'\
                'life sentences. Twenty-eight years later, he talked his'\
                'way out.',
                'Is Dr. Drew’s “Celebrity Rehab” therapy or tabloid voyeurism?',
                'War stories from the world of Manhattan real estate, written'\
                'during an era when everybody knew the Internet would completely'\
                'change the business and nobody quite knew how.']
titles.each_with_index { |title, index| Article.create(title: titles[index], description: [descriptions[index]])  }
