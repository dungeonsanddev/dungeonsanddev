import { PrismaClient, CATEGORY } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const exists = await prisma.course.findUnique({
    where: {
      slug: 'best-course',
    },
  });
  if (exists?.id) return;
  await prisma.course.create({
    data: {
      name: 'This is the best course',
      slug: 'best-course',
      media:
        'https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png',
      description: `# Respondit dato

## Efficiens Baucis

Lorem markdownum igne usum et adire huius consequiturque trepida puniceum
parabat tamen; ardua! Nova regni vacant. Petiti poscimur: ictu coniunx, coniuge,
et est **absens committi** protinus levis vel credite poteras dixit. Est sorores
tigno moderamine agros: tenui, lymphis ex omnes Iovem Echidnae late, quod licet,
poenam.

## Pallet qui regno inmanemque

Est deserit saxa, mihi **atque ignarus quae** illa respiciens; placet, ego
mundus. Suffusus non, deus aptius conchis ferrum et motumque viris [ferunt
exegit et](http://mersitcupit.org/pocula) frustra *huc hospes* desertaque
dumque. Et lapides et et deferre et stamine; in resupinoque velox Thebis super,
habenas scelerate. Aonios amatam! *Bellum gemino Atlantide* unam anus his
defensore tacito in legi Achaia prima, liquidarum *a*.

## Qui potero forsitan ramis vosne omnia et

Ityosque corpus, nec formae confinia iamque, vina cum, iter et conspicuus
Athenas nempe; erroribus inferna et? Iustis genitore natat frena. Vocem plena
urbem, Thyoneus audiat Propoetidas tibi: locis tot sidera ore. Minor sumptas
clauditur.

- Iuncta agitasse spectata discedens altaria refers postquam
- Oculos prima visi laedere ipsi Iove fervida
- Dapes tergo haec Theseus thalamos Cnosius Ilion

## Admonuisse non fertur et nec auspiciis triste

Quid resurgebant vidisti colla Tydidae veni: ortus ante pedes: erat: populo et
canebat labore audebatis genitor, pectus. Annos toros, in ille aut loqueretur
iubent **rapta**, gaudet! Et ante [unguibus](http://www.coniuge.io/) mittere,
iussorum vitiaverat vobis placato. Occupat dixit. Est mora [tres Achaemenide
campi](http://sum.net/quinta.html).

    if (qbe) {
        syn_inkjet_caps.record.wireless_panel_file(user_speakers_boot -
                myspacePpc, irq, deprecated);
    } else {
        disk_imap_tutorial.offline += alpha_bandwidth(technology, win(5, dropC,
                southbridgeDimmCifs));
        yobibyte_forum_box += 3;
    }
    scarewareOptical = opengl;
    if (bmpSourceEup) {
        domain_wireless_mac = aluBar;
    } else {
        ad_pup.schema_server = mysql_publishing;
        eupScroll.jquery(rpc, ipv_windows + ansiMonitor);
    }
    telecommunications_ocr_commerce(cd_cloud);
    var soft_output_ddr = zip_tcp + mode + 5;

Avidos fit videntem Cadmi. Novissima quod iam consumitis, est dux imitataque
materiam [induta](http://pariterque.com/esse-quod.html) vitisque: carbasa
minister non agricolis nisi meae aras inicere? Haec Parnasosque **urbe
praebentque** coniunx tectus atris ut plura funera erat digitis monticolae minus
Dulichius.
      `,
      category: CATEGORY.FRONTEND,
      language: 'EN',
      author: {
        create: {
          name: 'Respecatble human',
          photo: 'https://thispersondoesnotexist.com/image',
          description: 'I am a professor, yes',
          link_github: 'https://github.com/axodotdev',
          link_mastadoon: 'https://tech.lgbt/@nikkitaFTW',
          link_twitter: 'https://twitter.com/NikkitaFTW',
          link_website: 'https://example.com',
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
