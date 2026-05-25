import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  email:    z.string().email('Email không hợp lệ'),
  phone:    z.string().optional(),
  subject:  z.string().min(1, 'Vui lòng chọn chủ đề'),
  message:  z.string().min(10, 'Nội dung tối thiểu 10 ký tự'),
})

const SUBJECTS = [
  'Hỏi về đặt phòng',
  'Thay đổi / Hủy đặt phòng',
  'Góp ý dịch vụ',
  'Báo lỗi hệ thống',
  'Khác',
]

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: any) => {
    // Giả lập gửi form (không cần backend thật)
    await new Promise(r => setTimeout(r, 1000))
    console.log('Contact form submitted:', data)
    toast.success('Đã gửi tin nhắn! Chúng tôi sẽ phản hồi trong 24 giờ.')
    setSubmitted(true)
    reset()
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-medium text-gray-800 mb-3">Liên hệ với chúng tôi</h1>
        <p className="text-base text-gray-500">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">

        {/* ── Thông tin liên hệ ── */}
        <div className="md:col-span-2 flex flex-col gap-5">

          <div className="bg-primary rounded-2xl p-6 text-white">
            <h2 className="text-lg font-medium mb-5">Thông tin liên hệ</h2>
            {[
              { label: 'Địa chỉ',   value: '89 phường Hoàn Kiếm, TP. Hà Nội' },
              { label: 'Điện thoại', value: '0909 123 456' },
              { label: 'Email',      value: 'contact@hotelbooking.vn' },
              { label: 'Giờ làm việc', value: 'Thứ 2 – Chủ nhật\n06:00 – 22:00' },
            ].map(item => (
              <div key={item.label} className="flex gap-3 mb-4 last:mb-0">
                <div>
                  <p className="text-white/60 text-sm mb-0.5">{item.label}</p>
                  <p className="text-base leading-snug whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mạng xã hội */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <p className="text-base font-medium text-gray-800 mb-3">Theo dõi chúng tôi</p>
            <div className="flex gap-3">
              {[
                { label: 'Facebook', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { label: 'Zalo',     color: 'bg-sky-50 text-sky-700 border-sky-200'   },
                { label: 'YouTube',  color: 'bg-red-50 text-red-700 border-red-200'   },
              ].map(s => (
                <button key={s.label}
                  className={`flex items-center gap-1.5 text-sm font-medium
                              px-3 py-2 rounded-xl border ${s.color}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bản đồ Google Maps */}
          <div className="bg-gray-100 rounded-2xl h-64 overflow-hidden border border-gray-100 shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096814183571!2d105.84117131533206!3d21.028811885998316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHo%C3%A0n%20Ki%E1%BA%BFm%2C%20Hanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1691234567890!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            />
          </div>
        </div>

        {/* ── Form liên hệ ── */}
        <div className="md:col-span-3">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <div>
                  <p className="text-lg font-medium text-gray-800 mb-1">Đã gửi thành công!</p>
                  <p className="text-base text-gray-500">
                    Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
                  </p>
                </div>
                <button onClick={() => setSubmitted(false)}
                  className="text-base text-primary hover:underline">
                  Gửi tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <h2 className="text-lg font-medium text-gray-800 mb-1">Gửi tin nhắn</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1.5 block">Họ và tên *</label>
                    <input {...register('fullName')} placeholder="Nguyễn Văn A"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-base w-full
                                 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message as string}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1.5 block">Email *</label>
                    <input {...register('email')} type="email" placeholder="email@example.com"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-base w-full
                                 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message as string}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Số điện thoại</label>
                  <input {...register('phone')} placeholder="0909 123 456"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-base w-full
                               focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Chủ đề *</label>
                  <select {...register('subject')}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-base w-full
                               focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                               text-gray-700 bg-white">
                    <option value="">-- Chọn chủ đề --</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message as string}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Nội dung *</label>
                  <textarea {...register('message')} rows={5}
                    placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                    className="border border-gray-200 rounded-xl px-4 py-3 text-base w-full
                               resize-none focus:outline-none focus:ring-2
                               focus:ring-primary/20 focus:border-primary" />
                  {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message as string}</p>}
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="bg-primary text-white py-3 rounded-xl text-base font-medium
                             hover:bg-primary-dark disabled:opacity-60
                             flex items-center justify-center gap-2">
                  {isSubmitting && (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}
                  Gửi tin nhắn
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage