const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const axios = require('axios')
const cheerio = require('cheerio')
admin.initializeApp(functions.config().firebase);

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    //service: 'gmail',
    host: 'mail.azimutestartup.com',
    port: 465,
    secure: true,
    auth: {
        user: 'alan.martins@azimutestartup.com',
        pass: 'Zmfi7EfzV4aF'
    }
});

/////////////////// *** Email de Boas vindas *** //////////////////////////

exports.sendMailWelcome = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const email = req.query.email;
        const name = req.query.name;
        const login = req.query.login;
        const password = req.query.password;

        const mailOptions = {
            from: 'Vera Moreno <noreply@veramorenoapp.com>',
            to: email,
            subject: 'Bem vindo(a) a Vera Moreno!', // email subject
            html: ` 
            <body style="margin:0;padding:0;font-family: Open Sans;">

		<table width="700" align="center" cellpadding="0" cellspacing="0">
            <tr>
                <td style="padding:30px 0 30px 0" align="center">
					<img width="120px" alt="Imagem"  style="display:block;" src="https://i.imgur.com/mbLUZVA.png" />
                </td>
            </tr>
			<tr>
				<td style="padding:20px 0" bgcolor="#263470" align="center">
					<h2 style="color: #fff;margin: 0;font-size: 35px;">Bem vindo(a) a Vera Moreno</h2>
				</td>
			</tr>
			<tr>
				<td style="padding: 20px 20px 20px 20px;">
					<table width="100%" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" style="border-bottom: 2px solid #ccc;padding: 30px 0 50px 0;">
								<span style="color: #000;font-size: 22px;font-weight: bold;">Olá, ${name}</span>
                                <p style="color: #000;font-size: 16px;padding-bottom: 10px;">
                                    Bem-vindo ao App da Vera Moreno e <strong>obrigado por efetuar o seu cadastro</strong> no aplicativo que veio para facilitar a vida do imigrante brasileiro residente em Massachusetts. Pesquise lojas no Guia Comercial, anuncie nos Classificados, veja a cotação do dólar, ouça as melhores rádios online e muito mais!
                                </p>
                                <p style="padding-bottom: 10px;">Seguem as suas informações de cadastro:</p>
                                <span><strong>Usuário</strong>: ${email}</span><br>
                                <span><strong>Senha</strong>: ********* </span>
                                </p>
							</td>
						</tr>
					</table>
				</td>
            </tr>
            <tr>
				<td style="padding: 20px 20px 20px 20px;">
					<table width="100%" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" style="padding: 20px 0 20px 0;">
                                <p style="color: #000;font-size: 16px;padding-bottom: 10px;">
                                    Caso tenha esquecido sua senha de acesso, <br> basta <a href="#">clicar aqui</a> para criar uma nova e ter acesso ao app de imediato.
                                </p>
                                <p>Equipe Vera Moreno,</p>
                                <p>18 Chelsea St, Everett, MA 02149 <br> <a href="https://veramorenoapp.com">www.veramorenoapp.com</a> </p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr align="center">
                <td style="padding: 0 0 20px 0;">
                    <a href="https://www.facebook.com/VERAMORENOSTORE/"><img alt="Imagem" width="30px" style="display: inline-block;padding: 0 10px;" src="https://img.icons8.com/android/24/cccccc/facebook.png" /></a>   
                    <a href="https://www.instagram.com/veramorenoapp/"><img alt="Imagem" width="30px" style="display: inline-block;padding: 0 10px;" src="https://img.icons8.com/metro/26/cccccc/instagram-new.png" /></a>   
                    <a href="https://api.whatsapp.com/send/?phone&text=https%3A%2F%2Fwww.veramoreno.com%2F&app_absent=0"><img alt="Imagem" width="30px" style="display: inline-block;padding: 0 10px;" src="https://img.icons8.com/pastel-glyph/64/cccccc/whatsapp--v2.png" /></a>   
                </td>
			</tr>
		</table>

	</body>
            `

            // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});

/////////////////// Confirmação de assinatura no Plano Gold //////////////////////////


exports.sendMailPlanoGold = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const email = req.query.email;
        const name = req.query.name;

        const mailOptions = {
            from: 'Vera Moreno <noreply@veramorenoapp.com>',
            to: email,
            subject: 'I\'M A PICKLE!!!', // email subject
            html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});


///////////////////// LEMBRETE de renovação Plano Gold//////////////////////////

exports.sendMailRenovacaoPlanoGold = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const email = req.query.email;
        const name = req.query.name;

        const mailOptions = {
            from: 'Vera Moreno <noreply@veramorenoapp.com>',
            to: email,
            subject: 'I\'M A PICKLE!!!', // email subject
            html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});


/////////////////////////////// Email comunicando que o plano gold não foi renovado e o usuário vai retornar ao plano standard automaticamente a partir da data X.



///////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
exports.scheduledFunction = functions.pubsub.schedule('every 2 minutes').onRun((context) => {
    const fetchData = async (url) => {
        const result = await axios.get(url)
        return result.data
    }

    const main = async () => {
        const content = await fetchData("https://stardewvalleywiki.com/Villagers")
        const $ = cheerio.load(content)
        let villagers = []

        $('li.gallerybox').each((i, e) => {
            const title = $(e).find('.gallerytext > p > a').text();
            const avatar = "https://stardewvalleywiki.com" + $(e).find('.thumb > div > a > img').attr("src");
            const link = "https://stardewvalleywiki.com" + $(e).find('.gallerytext > p > a').attr("href");

            const data = { title, avatar, link }
            villagers.push(data)
        })

        console.log(villagers)
    }

    main()

    console.log('ativando em 5 minutos!');
});




*/

///////////////////// PUSH NOTIFICATION //////////////////////////


exports.sendNotificationApi = functions.https.onRequest((req, res) => {

    getMarker()
        .then((res) => {
            console.log(res.data());
        })
        .catch((erro) => {
            res.status(500).send(erro);
        })
});

async function sendMessage() {
    const snapshot = await firebase.firestore().collection('users').get()
    console.log(snapshot.data());
    return snapshot
}

async function getMarker() {
    const snapshot = await firebase.firestore().collection('users').get()
    snapshot.docs.map(doc => 'Tipo ' + typeof (doc.data()));
    return docs
}

