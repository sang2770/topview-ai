import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../shared/components/modal';
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ApiService } from '../../../../shared/services/api.service';
import { ElementRef } from '@angular/core';
import { catchError, of } from 'rxjs';
import { PopupConfirmService } from '../../../../shared/components/popup-confirm/popup-confirm.service';
import { URL_HANDLER } from '../../../../shared/constants/api';
import { SuggestInstallExtenstionComponent } from '../suggest-install-extenstion/suggest-install-extenstion.component';

@Component({
  selector: 'app-material-to-video',
  templateUrl: './material-to-video.component.html',
  styleUrl: './material-to-video.component.scss',
  standalone: false,
})
export class MaterialToVideoComponent implements AfterViewInit, OnInit {
  readonly Tab_script = "script";
  readonly Tab_text = "text";
  readonly sampleUrl = 'https://www.amazon.com/Fitbit-Advanced-Smartwatch-Graphite-Included/dp/B0B4N2T7GL/ref=pd_ybh_a_d_sccl_13/133-6358408-3616469?pd_rd_w=bXNMi&content-id=amzn1.sym.67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_p=67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_r=Q8RV6XHKNGAXTVVTS5KH&pd_rd_wg=ma93O&pd_rd_r=c256e4b2-1609-4215-9d4a-79793a53fe05&pd_rd_i=B0B4N2T7GL&psc=1';
  readonly sampleData = {
    title: 'Fitbit Sense 2 Advanced Health and Fitness Smartwatch with Tools to Manage Stress and Sleep, ECG App, SpO2, 24/7 Heart Rate and GPS, Shadow Grey/Graphite, One Size (S & L Bands Included)',
    description:
      `Learn to manage stress, sleep better and live healthier with Sense 2—our most advanced health and fitness smartwatch.Human Interface Input: Touchscreen
Manage stress and live healthier: all-day stress detection with cEDA and daily Stress Management Score, ECG app for atrial fibrillation assessment(1), irregular heart rhythm notifications(2), SpO2(3), health metrics dashboard(4), mindfulness content
Measure and improve sleep quality: personalized Sleep Profile(5), daily sleep stages & Sleep Score, smart wake alarm and do not disturb mode
Enhance activity: built-in GPS and workout intensity map, Daily Readiness Score(5), Active Zone Minutes, all-day activity tracking and 24/7 heart rate, 40+ exercise modes and automatic exercise tracking, water resistant to 50 meters
Designed for all-day wear: on-wrist Bluetooth calls, texts and phone notifications(6), customizable clock faces, Fitbit Pay(7), Amazon Alexa built-in(8), Google Wallet & Maps (Google Maps on Android only, coming Spring 2023 to iOS), 6+ day battery(9)
Includes a 6-month Premium membership complete with personalized insights, advanced analytics and more (New & returning Premium users only. Must activate trial within 60-days of device activation. Content and features may change)`,
    dataUrls: [
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2Fe7010c1ee1622b59d2423f10607f7c90.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRmU3MDEwYzFlZTE2MjJiNTlkMjQyM2YxMDYwN2Y3YzkwLmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=HSZ1vJJ0tcZKxU29FFNsAIbYvohRIOhPwB-GWILMTG-tqy~FrkQsCDxGsd3T7wyAEC6GETDrGmX13ZAhluDK-5ILvwUWJTRtdHQzCkaPnt9Il~rbzarW33J8TKPI1k7IkGxCCWB4uDjVLuc34eGdCuQ8~kulMbTaq98csT2~uLzhU8yCWdjfbQPB1Op6B9lcmjCIOOwMiaTaPSsoKQjsnGZ6ql8KwEBCwNj0QxV4w4ywnk34rnjfys2JXvklusy1tC0bAX-mFl5W5F3IOseqPSdYkVDlkQarohf5vNeDyuhT3HG8b9zwBW~WhUJVRG2d80rfC~wA721w~miWOGa7JQ__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F5bc909287028af310917eab735ab0115.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjViYzkwOTI4NzAyOGFmMzEwOTE3ZWFiNzM1YWIwMTE1LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=sXQXgxI~OrdSPEcXyFfgRdAF3YjY4EOMjEdHkDLCqcJFd6-egRAdCEPDi~oQmjKrvdJkPQ~fZRaBVJEOFmQSqU44SGw7sXEBIwftNjjf1DK5Hnd4EySgfkW3b4vkpNpgcxJiAzmvRxUcwk0qd6ZmW90Ffr5PkjY~rxszLOc5Nsx~diiMuZVdWYydZ8TnBWGKrfgBUrh0-Y7zmqXZzxLEM1OA291uTmeeNlLaW~GkfqMtrhoP375EvkUUCin5Cjx-3aTSPmGfU1lRqJxIrxemhvTdNCDSISzTiltsQJ-0Zc01wps-BBS39Szbdz8lAKiuVORxxXc6ftV4QrMoPCXzCQ__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F04f518993a01b293665d0bf95f430210.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjA0ZjUxODk5M2EwMWIyOTM2NjVkMGJmOTVmNDMwMjEwLmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=S6zlqiNAQ0b2EgPMEdQ6EBbePPHzIECxXetFFrUh0kdZkFblawq3EHfYVrWjvtbd4rV~FyCi0hQxV8GZhWEb5By4qgCXmGIKIeoS~ko50i9QIMQ7pco64fmv83WavtqpEsetYjMV997E1ftqSoKZUSr47svunLhctmmFDFZK~loKrOh5OmzHaAI0kPQdToGA6N8jEIOOeF~R8WpK~oVKIUyQHL-75A2-hF4-FEFMEayZKrW62UtFEdR9ulDxZvVE-TRhyjz5PwotMC6T93~fsUXSPMPIb11vUhFwMhFAyUGV1HxwSpcnv5rFpBnLN5HzGZ3EKGHa-FGDiMP-XG34mw__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F6753eda12502069dee33dd543f963b09.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjY3NTNlZGExMjUwMjA2OWRlZTMzZGQ1NDNmOTYzYjA5LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=fbzRrLu1XcX5HHc19Z-OSxcE1inEFkwy4MaC~L0KkHlvsROmYKqMjXshHnCFyrSau7NYVBR4C5Le3ntkpUU2opghHqAhjdQX-l-ozN6BoFkgfUJIANWYd5KLYZL70bTS90szSyOerEfoWN9MXTNWM1CPxumsV0K0tFIjsUdvQzD2JAq8xP9FRgWKtawvnc7Bl0mmxEcBgD~axiQHuHaGVs4SmePR0bnxOiMMTfsog30F2o~YmWKFAGhb~Vnrg75Dve3T65Ql-UrgMQKiofJ7yTwvEbL6Uox9mPY00jJiBISjXA5ZdI~rDH4lRP63UrLWzPdd4zgihB9CPf2Ac3vdOQ__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F6ebe47773dd07fc9f38f7f481063e626.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjZlYmU0Nzc3M2RkMDdmYzlmMzhmN2Y0ODEwNjNlNjI2LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=EhxYcAVZadu0~x1z7qCF0tNtK7zIYh0omurC3dgsfA1danA~Xp0ZTkYPayEJJFityVeuZFDQOCjAyMOkzt5gUMkUyFvUpecId37AfCxwK9ga5DY43pPpl6HhUacWlOR50RBjFNYQvQ3YRDvWB6oEUlcB4dpDZfh-y0LJJxA7xWNvaS3waLoo4XMGLa7LCH8O9VSsxMJGGmP5RnY8Oo3GqazF7TJWAL~byUkXJx~4SW2ierGRjSzoXXZB9MOFNIO7vFIGJPxLQxdiDUG28H-ZUfzMUTXboVOapiGCiCkiMq69mjzCCQQknHnRUerRAkG-oQplZr3MUEuBqdgeUluiBQ__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F419af628c7716298fad18f9f0731976a.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjQxOWFmNjI4Yzc3MTYyOThmYWQxOGY5ZjA3MzE5NzZhLmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=cAFQKDcNO1dsHEjohF61ryDB4vlb~wsZQvBPjw5Bp6y~RgXAV-exCAT5o-TiFzgD9ozpEUeM68EC8qx2U-I681mpEZ5SkSOxjgksccIUsZy2S8NHWz4hJY~ZFZeQNI3AwqzE-TejLXpus9FQDY0AoBZB-X4F5ocSXt4a~2BroJsrtv6kS5AX7ezQ5lokhiOlg7P1~FBWtQjqtE2OsB76jdC1o5HAK5mCW47AyXcdojGoiF9eDhPkrPP9W7DVImg5lQFBSeKQaTVZLVXAoHksYR74pXoR0BSzybEQwoCofNfvYEd2YGk6TsfEvTrmCq1Q0ZPYC2fjoXinbK7bXBvg2g__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F78e18b80ebf1ebf31e9f066345ab0705.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjc4ZTE4YjgwZWJmMWViZjMxZTlmMDY2MzQ1YWIwNzA1LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=idBXq0Y8XxPK8fcH7N16YXESblvLbQkfEmjAj9BFHs9si5AAicT8K3nxFrFQRX-bYayifw3~9SLc6afF7Kkg0oczs1VJZchIsN7DxIHTWxeOSkPlk3wXd0YOJA9FeUd5uXNwxiNDJjpd8xjdZhHh53fSerawvSBC0FLK3Vjh1b-GR~~RRIe-xWZ12MZYcvO5wn6OrIxjqNSv6dHbCIZncUXwSM9UU3Ygh8T1wc-KH6PTa~Qy-T~NTQrFus1SqyaY4LQ0jKDVCtcFmrUWSoqF8TY0B9kEsUJ26RWeu5fAxrMRocrRX96Shm6zq2qEArtwEhzrSboxHe2b0jAjRXNFvQ__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F2d79e9d76aa43f8cf47f552f3a73859d.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjJkNzllOWQ3NmFhNDNmOGNmNDdmNTUyZjNhNzM4NTlkLmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=r5tyg87C7kASVpxReyLvqg3eCrS3HfUhf6qAI7wZzKpj1D4UINL~iN3qHQ8hjiHCGHsvOOHSk5EovFWJwzLsJfXG-ebSM0Bij8NgKoXm1wKcHlcPeBn18gH71fydoCUILuyMVdMiqayQ0YKLm03FpYhoq73M5hwkZlvHCSu9sIwJaX6CtA4eNtyeidzvDbvmSpU6ScqT7s2QhqOu0DDGvksZa2hVuaBLVXBwjM4FoQ-bC3WASWlYPaMuLxQMx8NuRP5aXQpEI7JOPMMZFkMbLMiLxNMFTuQbA~03GuLnA72yaTyI6qpQDO4aZ9-9rE-ewu1EjXWj9SSyI2VG88uAiw__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F5483b0c2978d98b6e04747c0fe123318.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjU0ODNiMGMyOTc4ZDk4YjZlMDQ3NDdjMGZlMTIzMzE4LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=HTLEsPZN~bqobSBvfif9etCZHlhI90Tg0cCJObjD88C-Gr3~Z~8HAU0Xen3UZg7Bwu99tCGpKmn8ZsPbNUgNTm2vRgUno-WWtAA4IOERv3Oi2NMfFJzweIVKgNatwheCcqjxMgJbI3jq2~BRHsLhMLTqOSSBbcHkiXbOTQ9lcTiuoLjOv2~f97o4xuAZEcBi9sUJDgDVLaEX~ZIBFe1BvH8tYNfEdsDVHXNcUEo2d7EAYiMJHsTK5OR8k5MRBeWUL-8R-0A5SPwD-RoFVjweI-PEsZUGdrJfd70a~k53UTwaHp2mwamn~PT9b8YPeX4AG~0GEMuPBzjxLK8pcvD1fA__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F5483b0c2978d98b6e04747c0fe123318.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjU0ODNiMGMyOTc4ZDk4YjZlMDQ3NDdjMGZlMTIzMzE4LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=HTLEsPZN~bqobSBvfif9etCZHlhI90Tg0cCJObjD88C-Gr3~Z~8HAU0Xen3UZg7Bwu99tCGpKmn8ZsPbNUgNTm2vRgUno-WWtAA4IOERv3Oi2NMfFJzweIVKgNatwheCcqjxMgJbI3jq2~BRHsLhMLTqOSSBbcHkiXbOTQ9lcTiuoLjOv2~f97o4xuAZEcBi9sUJDgDVLaEX~ZIBFe1BvH8tYNfEdsDVHXNcUEo2d7EAYiMJHsTK5OR8k5MRBeWUL-8R-0A5SPwD-RoFVjweI-PEsZUGdrJfd70a~k53UTwaHp2mwamn~PT9b8YPeX4AG~0GEMuPBzjxLK8pcvD1fA__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2Fae21758d6c82cd1c87cee9b8f4e012ef.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRmFlMjE3NThkNmM4MmNkMWM4N2NlZTliOGY0ZTAxMmVmLmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=reKFqxgrVPSouEA8FWpsE~kB7JWitQrcYloC98xsYK8G9KQ0eSNJk3c7uo9-oDp8aV74HMZQqWFVQUt0I3uh5ktzQ7bwRIcKRE9YSOeP7M5gCZxD03p2MsXL4Eeq7ZzhUE1n-1KDKWG6vixZple6VdGIZ5kWlxCBlk5VJ4u24V0H71nL8jRq6HfL0~g0kSHjoVUz9~oRQRapYpzIk2xYhMb4h4COKLRE4saY3oO~64kODzrosacy~VOw50PsWO6GCcnEbkzN4JbGneTMdwzC2DU9PTlmrxZ4QlcrN0-~r7pNcydrM~NJbMjHqT79DqYo-BMmlpi0ecvAZgqeKvQ75g__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F3b7c9fdf374eec14af9c5a01a2c584b8.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjNiN2M5ZmRmMzc0ZWVjMTRhZjljNWEwMWEyYzU4NGI4LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=scwm96vwbiJKEO-rxgBjn~el9d5vc-JWz0x2FexyMVKD1u40675v9EHagSUw8sOiDRHQcN7zBJs8eQkD8NRcmlHec9GFKKVzgbLZYhBdo07HJ6Xo68RvBJVaKqa6oSnCA2rD7CdB-0nSo7pQISp9DfTYSOpgPQs34YADvCkOIHGrIHyrGnCd0nZqMfDeE~6UU2C3XfzkKYvG9ZaMzHLa93I6cQcKQ7oVMEGnQ9ZZZWuFOmu0fGd2O~jKfQEcuLmmevRs5bF2iNt0F4UMUuenmzbsl3yFxP3ZNgmSUCIGiZLneU2P6mYbpu~42PafA~TBfbQd0oHv23chw43u2T29qg__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2Fb769ed40e694a158b76fa28ace06cb65.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRmI3NjllZDQwZTY5NGExNThiNzZmYTI4YWNlMDZjYjY1LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=CHbdF-V7IuDq~YfgNI9Ah7Scus6XXDEmX9l2Hl~l9tL72mSl~0Mdg5Aqxq5FIcy1Y0i8kHd-ppyRLlCqiN9ZUnp5hO0xFCSITlZ-OJu9gQkk8F7lvPx1LgsP82RyiNTqBBVrxY785kYPzlq0Y0l1QbqQ6bVR8PerTrv2lY6AxmRR7ht50HGMFqPVu1GFNn5ksFF-aFZNQosqcedd4c~sMhLp9NB1h4bwWIBxvDh7BUYqsqLMbp0aihSff0WcnbB7jRAEmzvyhC7bI0Y-PniFqaksL0xtRBWPMDKujmF8DwSAUPD8luECiqEzBOwgKW~BpEZDbKZxJsJC2UnXOu98Xg__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F7c8f0ab19da23cbe76eb993232d8bb38.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjdjOGYwYWIxOWRhMjNjYmU3NmViOTkzMjMyZDhiYjM4LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=EHouQqpvh0-H5uJWm~ojrnfa1ZJu04GOMfJXWvPHUamya6yeCc-W~DuMzyYo~QDKATw~o~wiWfztINFMVaZEOBcQ8olnbMHeNELG3i9Q7kEvJkQPqsxeEEPZzBYS-uy2ETthWYO5JLN0VPjvROijUJpKQOKC8ldTxZ9-VhhIpHKIrWC8y4axSZrSDfkXggFibYDer6eWYOmQRmidNFbS5JP1YJm2kIxR7oKkZNxrkcndqi1sl4q0Q1CEtNQSdM0rS9MFrjjg1JJiR5rnHfc06aeMu2s1KrumZt5X9N51TEuK4fAgYkPovt8xJy~BN7m~~oteVMHQCQMHk6RR-oC65w__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Fcover_image%2F7c8f0ab19da23cbe76eb993232d8bb38.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZjb3Zlcl9pbWFnZSUyRjdjOGYwYWIxOWRhMjNjYmU3NmViOTkzMjMyZDhiYjM4LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NjMyNDc4Mn19fV19&Signature=EHouQqpvh0-H5uJWm~ojrnfa1ZJu04GOMfJXWvPHUamya6yeCc-W~DuMzyYo~QDKATw~o~wiWfztINFMVaZEOBcQ8olnbMHeNELG3i9Q7kEvJkQPqsxeEEPZzBYS-uy2ETthWYO5JLN0VPjvROijUJpKQOKC8ldTxZ9-VhhIpHKIrWC8y4axSZrSDfkXggFibYDer6eWYOmQRmidNFbS5JP1YJm2kIxR7oKkZNxrkcndqi1sl4q0Q1CEtNQSdM0rS9MFrjjg1JJiR5rnHfc06aeMu2s1KrumZt5X9N51TEuK4fAgYkPovt8xJy~BN7m~~oteVMHQCQMHk6RR-oC65w__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Famazon%2Fimg%2F21daa0b5c2752ae67e57834758ef5e0d.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZhbWF6b24lMkZpbWclMkYyMWRhYTBiNWMyNzUyYWU2N2U1NzgzNDc1OGVmNWUwZC5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDYzMjQ3ODJ9fX1dfQ__&Signature=Hmr7P21D5StAz7vDEYGPwguH5uCXgEO-rYbGgO8dtLqAPgAUahOTC2Dq7iy-1bPkp53ir8PsfqraT3RoyUCP9g6SO340x8oRBrP4y-6V0iScAxjJCjYC1Nf8pszmicWabNp120SVX5yFHNh1THg24NGhEU2HlqtHg~kn0dYQcXBSFGxWE0WanrPWp65VFapN0~az95w9up0UvvrKkKhxbgTwC2f4wBgpDBpbjs7WKE2vNbb2~RzFyU49CDlxYQvpFbcHGr6QYYW9FGuBrckocYbuO~NwfxDA5PIyE183ysEQ8aWOn1qSn4m1dDynXrnUKdg9H~D1FQIb3VtNF8dVQg__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Famazon%2Fimg%2F783631d8106b7003b2ee2d484a3fcac7.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZhbWF6b24lMkZpbWclMkY3ODM2MzFkODEwNmI3MDAzYjJlZTJkNDg0YTNmY2FjNy5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDYzMjQ3ODJ9fX1dfQ__&Signature=EpOTpieUXooyPHQVjEvVOiywkxd40vxQhucYDNR4BxoqYYU2Y~vhrT1UvKtjsC8NBpeUAw65-POCiuj3qsRrUMgQ0N3YknOcuqGnSAmUYHswNkiGXQAOdeGq9vO1J3q16vck97ZuwVYS~vbqb3~94izYS3SWI~1skFoWNLAZ5V9vJpKopJIUaAm~013xFUhoKG5Zq2hbVxdIw9IW1PA6clI6mgFHojB3A2SEAql36ojgxRML0-jwVZBme8cGwgsQFo1Aqkdko1AO9N~iWuthD4cDxk9qB8xYFHYWDc4K1ya051N3y~1ouRrQ0eojSjCnV18B5066pn3hVOPpL1HfdQ__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Famazon%2Fimg%2F2b2553b437e6b54817fa8e2915fb962f.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZhbWF6b24lMkZpbWclMkYyYjI1NTNiNDM3ZTZiNTQ4MTdmYThlMjkxNWZiOTYyZi5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDYzMjQ3ODJ9fX1dfQ__&Signature=NmAx0hrvde1DDSal1WnYGbRdTWe8sBKDIiDR-s09LtZkCiKe5mciqdcQnsmHbdBMSxtkwtV9kCMwmkUtGqJWFJM~CdhwoZS7e3D3kMJHHa3DBxBXtZDOCdGDQSrtSTpHo5nOUhP~~KZ4EHGKtrp3vcDRNeXQSCkOnsnaSkiDJl4gtFrO5~3LxSXNGoN5BiUEHiecAY2n-IAXo6eDY2~hfwzF83SpQhDidOvHkKdZUS69RWsqJqzbaynovPYGNqFQiFr9Jvke5rWAZrsYtZFqHu57RVwDqZuxoBGTNAPYO71ZaHk7VNGZmCAsLL31JxdBdBK~QtGgtvENTGQd-0gYBA__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Famazon%2Fimg%2Fd5ee33ae5c02d77db13a3c432f27beae.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZhbWF6b24lMkZpbWclMkZkNWVlMzNhZTVjMDJkNzdkYjEzYTNjNDMyZjI3YmVhZS5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDYzMjQ3ODJ9fX1dfQ__&Signature=ajylPLwORGmbukqqZcQR~SZvqa3-7f5dWfRc1IChBg80aJdN0iqazJ4LkcwvDc0qDs4DQThA~jZnXwnsmIjTYcGf57J79EzpD2gocecsrjxaXmzhbdzjG7jRkrIQope0jGoqTO3JZ1zxC2dYsU6c4oaiA9ajCmdJVKT-0JfCkYtffXQ8Q7m9634zgBYrs1Yzvy0gv7pEc8PP1YKspB4flgLRf4mRWzc-k3OWm6hlPw4QvKNmQCePAjSyC3eKfaf2xAW3DY3qMLzTwv1t41Zhc1GowPdqauTGLgNLWZNxyXKZic7IO6TCPt7CQWr5fBg~zIg4aifgfHr05TNRdNAHyg__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Famazon%2Fimg%2F73d8da501957f1506ec23e716e24f115.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZhbWF6b24lMkZpbWclMkY3M2Q4ZGE1MDE5NTdmMTUwNmVjMjNlNzE2ZTI0ZjExNS5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDYzMjQ3ODJ9fX1dfQ__&Signature=Wsac~UUCFqrSTdrmeMdVmZzTJTN3WEheD-Vnl8W8hOPRgX48xMepeA2svUGi7~sMG1g57myNKiawC-ZKMhmUIc0X-b~c2DvRbxqFF--T1lEJiGMHOL1aZUA9BPdGI3XrJwLjVRtIxhumABmPnRC5f6LIGldNI~qDhMN3zW9aW~Q2opmGvPhyU-nXiPPQtHfY40CIJnGAJLYI-EazC09b9-CJLfX5u4WcbBoEKDhFEy8XRGp2GSoB1iaLAioCJuM3lg0-cuw~L8MD1IQqIkqNCtwKKojfCjgbI4a4QnkJ9OVJVyMDePopmd4xSI0TwgG1jTD1M0NYdIw3s-6G~5EvJQ__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Famazon%2Fimg%2Ff919a58f6935ca7eb5aa31b59a91d6ce.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZhbWF6b24lMkZpbWclMkZmOTE5YTU4ZjY5MzVjYTdlYjVhYTMxYjU5YTkxZDZjZS5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDYzMjQ3ODJ9fX1dfQ__&Signature=QggPf-1TapLdDkXdi0IEoENtwlXyUlBjeBR0JLoz3kLHnEiJeqSQaf71O0swU-qVZYMprGIjZx1OUUCI8r6iPyGEGN7rNfemPyGK6-fvPwjj~-YxUOTdS4htGJrlt8iy~wm~pWuMZ1p4wGz6OfXoFXQQDqVZxkLDkSnG1fZaFJcqigYy-RF3M92i6lfb~bcPec4Qu98wm29ZeFmzU2acC5-qIu7syESkcRYEpb2WH8TbF57F87B61ejemWbypDF~qELE-loMsA39UWOBKzI1iTh0M4tcQcVH2XZCtlYuCZgQfsPT-o5bD6p5PgaUm9SGTQiUKOZNuJtVwyLY~l-zdA__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Famazon%2Fimg%2Fc5facdc15b235311c58075a780e8dc0d.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZhbWF6b24lMkZpbWclMkZjNWZhY2RjMTViMjM1MzExYzU4MDc1YTc4MGU4ZGMwZC5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDYzMjQ3ODJ9fX1dfQ__&Signature=qM7ItQ0HxU8c6kIfP2rqtA2z9FqKLv-90Rztg-v~yengEsuWkwcd2v9WR5sdxXSv-buEaz5r2H23ouWr4ou50nMSyGlDwXbm36sWo~q96thhoFnQP4EQH3Iq6XfV2Yq7-PWx836oWMqDkwnH3v9xmrIo-jQwlUyeALdZc6sZGqxE6SbWCc-mpMLaKbJfl7SKqe-HgIlgRZsEWm~AkY0AOiUjdewgKfcbFSzAgVd7RNlEfmNlsVJL~6M5YswoxFlC1y~VmfCbhG0fKLO4ZVgPegt8x~AF1NNb36LQhrxn~nFquFJuGeh1U48TLGkFBZUtdH0-VI3X6NuIJ0oy477ELg__&Key-Pair-Id=K21X5TGS0ALJI4",
      "https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Famazon%2Fimg%2Fc6e6a9e537f1d74fa6e173ce48fa887a.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZhbWF6b24lMkZpbWclMkZjNmU2YTllNTM3ZjFkNzRmYTZlMTczY2U0OGZhODg3YS5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDYzMjQ3ODJ9fX1dfQ__&Signature=Kld-PmR80fgjNNUI3A20dJQq-ky0Bpk3xgtdFRNoMiV23ajFHdpoMdSwVA2uPD9sxINSqnfenVcJJBGX~eQZHZGAJg8uVCZIHRHWczfdaja09XSEsoRuFLYWXoZPPj~XZssYs5gmg5U72ui8X8JW7EvZSA3YzUHaIA243uj-3O82MHclBl9MP-EaoBALomtapZB-GodZph4zQhxNl5eK1xdshne1ph-WNoydUW3~yF0bDKyLCmJGTR4KcxtUnWnoqOsbj3SSbsLRMbizms46ihaOd56iOb-nQGnSXaUxdIhz7Pxch96Hd5P8Z39AVly6-lCginzFS8mCAMeW3HvmQg__&Key-Pair-Id=K21X5TGS0ALJI4"]
  }
  tab?: string = this.Tab_text;
  isShowPlaceHolder: boolean = true;
  form: FormGroup = new FormGroup({});
  @ViewChild('inputLink', { static: true }) inputLinkRef: any;
  images: string[] = [];
  languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Korean', value: 'ko' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Turkish', value: 'tr' },
    { label: 'Indonesian', value: 'id' },
    { label: 'Thai', value: 'th' },
    { label: 'Vietnamese', value: 'vi' },
    { label: 'Malay', value: 'ms' },
    { label: 'Tamil', value: 'ta' },
    { label: 'Greek', value: 'el' },
  ];

  voices = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  duration = [
    { label: '30 seconds', value: 30 },
    { label: '1 minutes', value: 60 },
    { label: '2 minutes', value: 120 },
    { label: '3 minutes', value: 180 },
    { label: '4 minutes', value: 240 },
  ]

  viewportList = [
    { label: '9:16', value: '9:16', w: '10px', h: '20px' },
    { label: '16:9', value: '16:9', w: '20px', h: '10px' },
    { label: '1:1', value: '1:1', w: '20px', h: '20px' },
    { label: '4:3', value: '4:3', w: '20px', h: '15px' },
    { label: '3:4', value: '3:4', w: '15px', h: '20px' },
  ];

  config: any = {
    viewport: '16:9',
    language: 'en',
    voice: 'female',
    duration: 30,
  };
  avatar: any = {};

  analyzeProgress = 0;
  constructor(
    public activatedRoute: ActivatedRoute,
    public dashboardService: DashboardService,
    public modalService: ModalService,
    public fb: FormBuilder,
    public router: Router,
    public http: HttpClient,
    public loadingService: LoadingService,
    private apiService: ApiService,
    private popupService: PopupConfirmService,
  ) {
    dashboardService.title$.next('Material to Video');
    this.form = fb.group({
      link: ['', []],
      name: ['', [Validators.required]],
      script: ['', [Validators.required]],
    });

    this.form.get('link')?.valueChanges.subscribe((value) => {
      this.isShowPlaceHolder = !value;
    });
  }

  ngOnInit(): void {
    this.openSelectAvatar();

  }

  openSuggestInstallExtenstion() {
    this.modalService.open(SuggestInstallExtenstionComponent, {
      title: '',
      data: {},
      size: 'lg',
      centered: true,
    }).afterClosed$.subscribe((res) => {
    });
  }
  ngAfterViewInit(): void { }

  changeTab(tab: string) {
    this.tab = tab;
  }

  generate() {
    this.popupService.progress({
      // title: 'Create video',
      message: "Video Generated Successfully!",
      pendingMessage: "Generating...",
      confirmText: "Download",
      size: "md",
      videoPreview: {
        url: this.avatar?.url ?? 'https://www.topview.ai/images/m2v/avatar_demo.png',
        duration: this.config.duration,
      }
    }).afterClosed$.subscribe((res) => {
      if (!res) return;
      this.router.navigate([URL_HANDLER['MATERIAL_URL']]).then();
    });
  }

  togglePlaceHolder() {
    this.isShowPlaceHolder = !this.isShowPlaceHolder;

    if (this.inputLinkRef) {
      this.inputLinkRef.nativeElement.focus();
    }
  }

  openSelectAvatar() {
    this.modalService
      .open(SelectAvatarComponent, {
        title: 'AI avatar',
        data: {},
        size: 'xl',
      })
      .afterClosed$.subscribe((result) => {
        this.avatar = result;
      });
  }

  redirectToDashboard() {
    this.router.navigate([ROUTER_UTILS.DASHBOARD.getHome()]);
  }

  getImageProduct() {
    this.analyzeProgress = 10;
    const interval = setInterval(() => {
      if (this.analyzeProgress < 90) {
        this.analyzeProgress += 10;
      }
    }, 1000);
    const link = this.form.get('link')?.value;
    if (!link) return;
    this.apiService.getProduct(link).pipe(
      catchError(() => {
        return of({});
      })
    ).subscribe((res: any) => {
      this.images = res.images;
      this.form.get('name')?.setValue(res.title);
      this.form.get('script')?.setValue(res.description);      
      if (!this.images.length || ((!res.title || res.title === "Title not found") && (!res.description || res.description === "Description not found"))) {
        this.openSuggestInstallExtenstion();
      }
      clearInterval(interval);
      this.analyzeProgress = 0;
    });
  }

  fillExample() {
    this.form.get('link')?.setValue(this.sampleUrl);
    this.analyzeProgress = 10;
    this.loadingService.show();
    const interval = setInterval(() => {
      if (this.analyzeProgress < 90) {
        this.analyzeProgress += 10;
      }
    }, 500);
    setTimeout(() => {
      this.images = this.sampleData.dataUrls;
      this.form.get('name')?.setValue(this.sampleData.title);
      this.form.get('script')?.setValue(this.sampleData.description);
      clearInterval(interval);
      this.analyzeProgress = 0;
      this.loadingService.hide();
    }, 5000);
  }

  removeItemResult(index: number) {
    this.images = this.images.filter((_, i) => i !== index);
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  // Add allowed file types
  private allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/bmp',
    'image/webp',
    'video/mp4',
    'video/quicktime' // for .mov files
  ];

  onFileUploadClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (const file of files) {
      if (!this.allowedFileTypes.includes(file.type)) {
        console.error('Invalid file type:', file.type);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    // Clear input value to allow selecting the same file again
    this.fileInput.nativeElement.value = '';
  }
}
